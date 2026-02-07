import { Logo } from '@ui/components/layout/Logo'
import { PublishButton } from './PublishButton'

type WriteNavbarProps = {
  title: string
  content: string | undefined
}

export function WriteNavbar({ title, content }: WriteNavbarProps) {
  return (
    <header className="w-full border-b">
      <div className="container-fluid">
        <div className="flex items-center justify-between w-full py-2 h-16">
          <Logo />
          <PublishButton title={title} content={content} />
        </div>
      </div>
    </header>
  )
}
