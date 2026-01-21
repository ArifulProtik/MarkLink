import { PublishButton } from './PublishButton'
import { Logo } from '@/components/layout/Logo'

type WriteNavbarProps = {
  onPublish?: () => void
  title: string
}

export function WriteNavbar({ onPublish, title }: WriteNavbarProps) {
  return (
    <header className="w-full border-b">
      <div className="container-fluid">
        <div className="flex items-center justify-between w-full py-2 h-16">
          <Logo />
          <PublishButton onClick={onPublish} title={title} />
        </div>
      </div>
    </header>
  )
}
