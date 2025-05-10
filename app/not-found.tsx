import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-yellow-50 px-4 text-center font-urbanist">
      <div className="max-w-md mx-auto">
        <div className="mb-6 text-space-darkgreen font-bold text-8xl">404</div>
        <h1 className="text-4xl font-bold mb-4 text-space-darkgreen">Page Not Found</h1>
        <p className="text-gray-600 mb-8 text-lg">
          We couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        <Button asChild className="bg-space-darkgreen text-space-greens hover:bg-space-blacks">
          <Link href="/" className="flex items-center">
            <Home className="mr-2 h-4 w-4" />
            Return to Homepage
          </Link>
        </Button>
      </div>
    </div>
  )
}