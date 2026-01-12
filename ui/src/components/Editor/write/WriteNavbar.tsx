import { Logo } from '@/components/layout/Logo'
import { PublishButton } from '@/components/write/PublishButton'

type WriteNavbarProps = {
  onPublish?: () => void
}

export function WriteNavbar({ onPublish }: WriteNavbarProps) {
  return (
    <header className="w-full border-b">
      <div className="container-fluid">
        <div className="flex items-center justify-between w-full py-2 h-16">
          <Logo />
          <PublishButton onClick={onPublish} />
        </div>
      </div>
    </header>
  )
}
