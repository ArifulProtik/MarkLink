import { createFileRoute } from '@tanstack/react-router'
import { HomeComponent } from '@ui/components/home/HomeComponent'

export const Route = createFileRoute('/_main/')({
  component: RouteComponent,
})

function RouteComponent() {
  const ctx = Route.useRouteContext()
  if (!ctx.user) {
    return <HomeComponent />
  }
  return <div>This is the main route! hello {ctx.user.name} </div>
}
