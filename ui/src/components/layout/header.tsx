import { Link } from '@tanstack/react-router'

import { LoginButton } from '@/components/auth/login-button'
import { UserButton } from '@/components/auth/user-button'
import { useSession } from '@/lib/auth-client'

export function Header() {
  const session = useSession()

  return (
    <header
      className="sticky top-0 z-50 w-full border-b bg-background/95
        backdrop-blur supports-backdrop-filter:bg-background/60"
    >
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            {/* Simple Logo */}
            <div className="h-6 w-6 rounded-full bg-primary" />
            <span className="font-bold">MarkLink</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          {session.isPending ? (
            <div className="h-9 w-24 animate-pulse rounded bg-muted" />
          ) : session.data?.user ? (
            <UserButton user={session.data.user} />
          ) : (
            <LoginButton />
          )}
        </div>
      </div>
    </header>
  )
}
