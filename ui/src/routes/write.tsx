import { createFileRoute, redirect } from '@tanstack/react-router'
import { WriteComponent } from '@ui/components/write/write-component'

export const Route = createFileRoute('/write')({
  component: RouteComponent,
  loader: ({ context }) => {
    const { user } = context
    if (!user) {
      throw redirect({ to: '/' })
    }
    return null
  },
  ssr: false,
})

function RouteComponent() {
  return (
    <>
      <WriteComponent />
    </>
  )
}
