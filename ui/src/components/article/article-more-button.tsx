import { HugeiconsIcon } from '@hugeicons/react'
import {
  Delete02Icon,
  Edit02Icon,
  Flag03Icon,
  MoreHorizontalFreeIcons,
  UserAdd02Icon,
} from '@hugeicons/core-free-icons'
import { Button } from '../ui/button'
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

  const handleFollowAuthor = () => {
    console.log('Follow author:', authorID)
  }

  const handleReport = () => {
    console.log('Report article:', articleID)
  }

  const handleEdit = () => {
    console.log('Edit article:', articleID)
  }

  const handleDelete = () => {
    console.log('Delete article:', articleID)
  }

  if (!userID) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="link" className="text-foreground" size="lg">
          <HugeiconsIcon className="size-5" icon={MoreHorizontalFreeIcons} />
        </Button>
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
