import { createFileRoute } from '@tanstack/react-router'
import { WriteComponent } from '@ui/components/write/WriteComponent'

export const Route = createFileRoute('/write')({
  component: RouteComponent,
  ssr: false,
})

function RouteComponent() {
  return (
    <>
      <WriteComponent />
    </>
  )
}
