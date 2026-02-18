import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { Spinner } from '../ui/spinner'
import type { AppUser } from '@/lib/types'
import { AddCommentMutation } from '@/data/queries/article'

interface AddCommentProps {
  user: AppUser
  article_id: string
}

const AddComment = ({ user, article_id }: AddCommentProps) => {
  const [content, setContent] = useState<string>()
  const { mutate: addComment, isPending } = AddCommentMutation(article_id)
  return (
    <div className="flex flex-col gap-4 py-4 border-b">
      <div className="flex gap-3 items-center">
        <Avatar>
          <AvatarImage src={user.image || ''} />
          <AvatarFallback>{user.name}</AvatarFallback>
        </Avatar>
        <div className="text-base font-semibold">{user.name}</div>
      </div>
      <Textarea
        onChange={(e) => setContent(e.target.value)}
        value={content}
        placeholder="Write your comment"
        className="resize-none bg-muted text-foreground font-serif"
      />
      <Button
        className="w-30"
        disabled={!content}
        onClick={() => {
          addComment(content!)
          setContent('')
        }}
      >
        {isPending ? <Spinner /> : 'Comment'}
      </Button>
    </div>
  )
}

export default AddComment
