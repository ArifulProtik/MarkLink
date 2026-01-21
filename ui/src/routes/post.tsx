import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/post')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>v Hello "/post"! codeium you there?</div>
}
