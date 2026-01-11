import { Button } from '@/components/ui/button'

type PublishButtonProps = {
  onClick?: () => void
}

export function PublishButton({ onClick }: PublishButtonProps) {
  return (
    <Button variant="default" size="lg" onClick={onClick}>
      Publish
    </Button>
  )
}
