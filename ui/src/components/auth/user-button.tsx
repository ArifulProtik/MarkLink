import type { User } from 'better-auth'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { buttonVariants } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { signOut } from '@/lib/auth-client'

interface UserButtonProps {
  user: User
}

export function UserButton({ user }: UserButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={buttonVariants({
          className: 'relative h-8 w-8 rounded-full',
          variant: 'ghost',
        })}
      >
        <Avatar className="h-8 w-8">
          <AvatarImage
            src={user.image ? user.image : ''}
            alt={user.name ? user.name : 'User'}
          />
          <AvatarFallback>
            {user.name ? user.name.charAt(0) : 'U'}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuItem
          onClick={async () => {
            await signOut({
              fetchOptions: {
                onSuccess: () => {
                  window.location.reload()
                },
              },
            })
          }}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
