import { HugeiconsIcon } from '@hugeicons/react'
import {
  Copy01Icon,
  Linkedin01Icon,
  RedditIcon,
  Share01Icon,
  XingIcon,
} from '@hugeicons/core-free-icons'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

interface ArticleShareButtonProps {
  slug: string
  articleTitle: string
}

function ArticleShareButton({
  slug,
  articleTitle,
}: ArticleShareButtonProps) {
  const shareUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/article/${slug}`
      : `/article/${slug}`

  const encodedUrl = encodeURIComponent(shareUrl)
  const encodedTitle = encodeURIComponent(articleTitle)

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      toast.success('Link copied to clipboard')
    } catch {
      toast.error('Failed to copy link')
    }
  }

  const handleShareFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
    window.open(url, '_blank', 'width=600,height=400')
  }

  const handleShareX = () => {
    const url = `https://x.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`
    window.open(url, '_blank', 'width=600,height=400')
  }

  const handleShareReddit = () => {
    const url = `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`
    window.open(url, '_blank', 'width=600,height=400')
  }

  const handleShareLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
    window.open(url, '_blank', 'width=600,height=400')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="link" className="text-foreground" size="lg">
          <HugeiconsIcon className="size-5" icon={Share01Icon} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem className="cursor-pointer" onClick={handleCopyLink}>
          <HugeiconsIcon className="size-4" icon={Copy01Icon} />
          Copy Link
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={handleShareFacebook}
        >
          <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          Share to Facebook
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={handleShareX}>
          <HugeiconsIcon className="size-4" icon={XingIcon} />
          Share to X
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={handleShareReddit}
        >
          <HugeiconsIcon className="size-4" icon={RedditIcon} />
          Share to Reddit
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={handleShareLinkedIn}
        >
          <HugeiconsIcon className="size-4" icon={Linkedin01Icon} />
          Share to LinkedIn
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ArticleShareButton
