import { Logo } from '@ui/components/layout/logo'
import { UpdateButton } from './update-button'

interface EditNavbarProps {
  articleId: string
  title: string
  content: string
  slug: string
  existingData: {
    title: string
    preview_image: string
    preview_text: string
    tags: Array<string>
  }
}

export function EditNavbar({
  articleId,
  title,
  content,
  slug,
  existingData,
}: EditNavbarProps) {
  return (
    <header className="w-full border-b">
      <div className="container-fluid">
        <div className="flex items-center justify-between w-full py-2 h-16">
          <Logo />
          <UpdateButton
            articleId={articleId}
            title={title}
            content={content}
            slug={slug}
            existingData={existingData}
          />
        </div>
      </div>
    </header>
  )
}
