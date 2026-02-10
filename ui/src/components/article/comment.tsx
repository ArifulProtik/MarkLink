import { HugeiconsIcon } from '@hugeicons/react'
import { MoreHorizontalIcon } from '@hugeicons/core-free-icons'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import type { Comment } from '@/lib/types'
import { formatSmartTime } from '@/lib/dayjs'

interface CommentProps {
  comment: Comment
  userID?: string
}

const SingleComment = ({ comment, userID }: CommentProps) => {
  return (
    <div className="flex flex-col py-4 border-b gap-3">
      <div className="flex items-center gap-3 justify-between">
        <div className="flex gap-2">
          <Avatar size="lg">
            <AvatarImage src={comment.author?.image || ''} />
            <AvatarFallback>{comment.author?.name}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-0">
            <p className="text-sm font-semibold"> {comment.author?.name} </p>
            <p
              className="text-sm text-muted-foreground"
              suppressHydrationWarning
            >
              {formatSmartTime(comment.createdAt)}
            </p>
          </div>
        </div>
        {userID && userID == comment.author_id && (
          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer">
              <HugeiconsIcon icon={MoreHorizontalIcon} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-10!">
              <DropdownMenuItem className="text-destructive cursor-pointer">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      <p className="text-base font-serif">{comment.content}</p>
    </div>
  )
}

export default SingleComment
