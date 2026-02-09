import { HugeiconsIcon } from '@hugeicons/react'
import { Comment02Icon, FavouriteIcon } from '@hugeicons/core-free-icons'
import { Button } from '../ui/button'
import ArticleMoreButton from './article-more-button'
import ArticleShareButton from './article-share-button'
import { useToggleArticleLike } from '@/data/queries/article'
import { cn } from '@/lib/utils'

interface ContentBarProps {
  likesCount: number
  isLiked: boolean
  articleID: string
  slug: string
  authorID: string
  articleTitle: string
  userID?: string | null
  onCommentClick?: () => void
}

const ContentBar = ({
  likesCount,
  isLiked,
  articleID,
  slug,
  authorID,
  articleTitle,
  userID,
  onCommentClick,
}: ContentBarProps) => {
  const { mutate: toggleLike } = useToggleArticleLike()

  return (
    <div className="border-t border-b py-2">
      <div className="flex justify-between items-center text-muted-foreground">
        <div className="flex gap-3">
          <div className="flex gap-0 items-center">
            <Button
              onClick={() => toggleLike(articleID)}
              variant="link"
              className="text-foreground"
              size="lg"
            >
              <HugeiconsIcon
                className={cn(
                  'size-5',
                  isLiked && 'text-gray-900 fill-gray-600',
                )}
                icon={FavouriteIcon}
              />
            </Button>
            <p className="text-base font-medium">{likesCount}</p>
          </div>
          <Button
            className="text-foreground"
            variant="link"
            size="lg"
            onClick={onCommentClick}
          >
            <HugeiconsIcon className="size-5" icon={Comment02Icon} />
          </Button>
        </div>
        <div className="flex gap-3">
          <ArticleShareButton slug={slug} articleTitle={articleTitle} />
          <ArticleMoreButton
            articleID={articleID}
            authorID={authorID}
            userID={userID}
          />
        </div>
      </div>
    </div>
  )
}

export default ContentBar
