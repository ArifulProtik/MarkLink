import { HugeiconsIcon } from '@hugeicons/react'
import {
  Comment02Icon,
  FavouriteIcon,
  MoreHorizontalFreeIcons,
  Share01Icon,
} from '@hugeicons/core-free-icons'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useRouter } from '@tanstack/react-router'
import { Button } from '../ui/button'
import { client } from '@/lib/api'

interface ContentBarProps {
  likesCount: number
  isLiked: boolean
  articleID: string
  authorID: string
  userID?: string
  onCommentClick?: () => void
}

const ContentBar = ({
  likesCount,
  isLiked,
  articleID,
  onCommentClick,
}: ContentBarProps) => {
  const route = useRouter()
  const { mutate: toggleLike } = useMutation({
    mutationFn: async (articleId: string) => {
      return client.api.v1.like.post({ articleId })
    },
    onSuccess: (data) => {
      toast.success(data.data?.message)
      route.invalidate()
    },
    onError: () => {
      toast.error('You are not authorized')
    }
  })


  return (
    <div className="border-t border-b py-2">
      <div className="flex justify-between items-center text-muted-foreground">
        <div className="flex gap-3">
          <div className="flex gap-0 items-center">
            <Button onClick={() => toggleLike(articleID)} variant="link" size="lg">
              <HugeiconsIcon
                className={`size-5
                  ${isLiked ? 'text-gray-900 fill-gray-600' : ''}`}
                icon={FavouriteIcon}
              />
            </Button>
            <p className="text-base font-medium">{likesCount}</p>
          </div>
          <Button variant="link" size="lg" onClick={onCommentClick}>
            <HugeiconsIcon className="size-5" icon={Comment02Icon} />
          </Button>
        </div>
        <div className="flex gap-3">
          <Button variant="ghost" size="lg">
            <HugeiconsIcon className="size-5" icon={Share01Icon} />
          </Button>
          <Button variant="ghost" size="lg">
            <HugeiconsIcon className="size-5" icon={MoreHorizontalFreeIcons} />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ContentBar
