import { useRouter } from '@tanstack/react-router'
import {
  Logout01Icon,
  QuillWrite02Icon,
  Setting07Icon,
  UserAccountIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { authClient } from '@ui/lib/auth-client'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import type { User } from 'better-auth'

type AvaterBtnProps = {
  User: User
}

export const AvaterBtn = ({ User }: AvaterBtnProps) => {
  const router = useRouter()
  const handleSignout = async () => {
    try {
      await authClient.signOut()
    } catch (error) {
      console.error(error)
    }
    router.invalidate()
    router.navigate({ to: '/', replace: true })
  }
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className={'cursor-pointer'}>
            <AvatarImage
              src={User.image || 'https://github.com/shadcn.png'}
              alt={User.name}
            />
            <AvatarFallback></AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40 text-base !important">
          <DropdownMenuGroup>
            <DropdownMenuLabel className="text-foreground font-semibold">
              {User.name}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <HugeiconsIcon
                icon={QuillWrite02Icon}
                className="text-cyan-500"
              />{' '}
              Write
            </DropdownMenuItem>
            <DropdownMenuItem>
              <HugeiconsIcon
                icon={UserAccountIcon}
                className="text-amber-500"
              />{' '}
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <HugeiconsIcon icon={Setting07Icon} className="text-green-600" />{' '}
              Settings
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              className={`cursor-pointer text-destructive hover:text-destructive
                hover:bg-none`}
              onClick={handleSignout}
            >
              <HugeiconsIcon icon={Logout01Icon} />
              Logout
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
