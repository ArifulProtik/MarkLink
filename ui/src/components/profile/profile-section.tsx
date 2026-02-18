import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import type { UserPublic } from '@/lib/types'

interface ProfileSectionProps {
  user: UserPublic
}

function getInitials(name: string | null): string {
  if (!name) return '?'
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase()
  }
  return (
    parts[0].charAt(0).toUpperCase() +
    parts[parts.length - 1].charAt(0).toUpperCase()
  )
}

export default function ProfileSection({ user }: ProfileSectionProps) {
  return (
    <div className="flex flex-col gap-3 md:items-start items-center w-full">
      <Avatar className="size-42">
        <AvatarImage src={user.image || ''} />
        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
      </Avatar>
      <div>
        <h1 className="text-xl font-bold">{user.name}</h1>
        <p className="text-muted-foreground text-base">@{user.username}</p>
      </div>
    </div>
  )
}
