import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const {data: { user }, error: userError} = await supabase.auth.getUser()
  
  // Check if trying to access dashboard or listing page
  const isDashboardRoute = request.nextUrl.pathname.includes('/authenticated/dashboard')
  const isListingRoute = request.nextUrl.pathname.includes('/list-property/listing')
  
  // Protected routes that require authentication
  if (request.nextUrl.pathname.startsWith("/authenticated") && userError) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  
  // Check if trying to access agent dashboard
  if (isDashboardRoute && user && !userError) {
    // For regular users who aren't admins, check if they're agents
    if (!user.user_metadata?.isAdmin) {
      // If user claims to be an agent through metadata, verify in DB
      if (user.user_metadata?.isAgent) {
        const { data: agentData, error } = await supabase
          .from('agents')
          .select('id')
          .eq('userId', user.id)
          .single()
        
        // If no agent record found, redirect to agent registration
        if (error || !agentData) {
          return NextResponse.redirect(new URL('/agent/register?reason=agent_required', request.url))
        }
      } else {
        // Not an agent, but trying to access dashboard
        return NextResponse.redirect(new URL('/agent/register?reason=access_denied', request.url))
      }
    }
  }
  
  if (request.nextUrl.pathname.startsWith("/agent") && userError) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/login") && !userError) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/signup") && !userError) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  
  // Additional agent verification for listing page
  if (isListingRoute && user) {
    // If user claims to be an agent through metadata, verify in DB 
    if (user.user_metadata?.isAgent) {
      // Check if agent record exists
      const { data: agentData, error } = await supabase
        .from('agents')
        .select('id')
        .eq('userId', user.id)
        .single()
      
      // If no agent record found, redirect to agent registration page
      if (error || !agentData) {
        return NextResponse.redirect(new URL('/agent/register?reason=agent_required', request.url))
      }
    } else {
      // User is not an agent and trying to access listing page
      return NextResponse.redirect(new URL('/agent/register?reason=access_denied', request.url))
    }
  }

  return supabaseResponse
}