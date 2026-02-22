import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import type { UserPublic } from '@/lib/types'

interface ProfileSectionProps {
  data: UserPublic
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

export default function ProfileSection({ data }: ProfileSectionProps) {
  return (
    <div className="flex flex-col gap-3 md:items-start items-center w-full">
      <Avatar className="size-42">
        <AvatarImage src={data.user.image || ''} />
        <AvatarFallback>{getInitials(data.user.name)}</AvatarFallback>
      </Avatar>
      <div>
        <h1 className="text-xl font-bold">{data.user.name}</h1>
        <p className="text-muted-foreground text-base">@{data.user.username}</p>
      </div>
    </div>
  )
}
