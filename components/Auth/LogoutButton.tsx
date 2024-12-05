'use client'

import { useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { logout } from '@/app/(actions)/logout'

export function LogoutButton() {
  const [isPending, startTransition] = useTransition()

  return (
    <Button
      onClick={() => startTransition(() => logout())}
      disabled={isPending}
    >
      {isPending ? 'Logging out...' : 'Logout'}
    </Button>
  )
}

