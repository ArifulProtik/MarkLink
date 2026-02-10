import { HugeiconsIcon } from '@hugeicons/react'
import {
  Delete02Icon,
  Edit02Icon,
  Flag03Icon,
  MoreHorizontalFreeIcons,
  UserAdd02Icon,
} from '@hugeicons/core-free-icons'
import { useNavigate, useParams } from '@tanstack/react-router'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

interface ArticleMoreButtonProps {
  articleID: string
  authorID: string
  userID?: string | null
}

function ArticleMoreButton({
  articleID,
  authorID,
  userID,
}: ArticleMoreButtonProps) {
  const isAuthor = userID && userID === authorID
  const navigate = useNavigate()
  const { slug } = useParams({ from: '/_main/article/$slug' })

  const handleFollowAuthor = () => {
    console.log('Follow author:', authorID)
  }

  const handleReport = () => {
    console.log('Report article:', articleID)
  }

  const handleEdit = () => {
    navigate({ to: '/article/edit/$slug', params: { slug } })
  }

  const handleDelete = () => {
    console.log('Delete article:', articleID)
  }

  if (!userID) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="cursor-pointer text-foreground hover:text-foreground/80
          inline-flex items-center justify-center size-10 rounded-md
          transition-colors"
        aria-label="More options"
      >
        <HugeiconsIcon className="size-5" icon={MoreHorizontalFreeIcons} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={handleFollowAuthor}
        >
          <HugeiconsIcon className="size-4" icon={UserAdd02Icon} />
          Follow Author
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={handleReport}>
          <HugeiconsIcon className="size-4" icon={Flag03Icon} />
          Report Article
        </DropdownMenuItem>
        {isAuthor && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={handleEdit}>
              <HugeiconsIcon className="size-4" icon={Edit02Icon} />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              variant="destructive"
              onClick={handleDelete}
            >
              <HugeiconsIcon className="size-4" icon={Delete02Icon} />
              Delete
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ArticleMoreButton
