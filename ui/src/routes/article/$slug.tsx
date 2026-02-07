import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/article/$slug')({
  component: RouteComponent,
})

function RouteComponent() {
  const { slug } = Route.useParams()
  return <div>Hello "/article/${slug}"</div>
}
