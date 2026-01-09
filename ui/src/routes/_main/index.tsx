import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/')({
  component: RouteComponent,
})

function RouteComponent() {
  const ctx = Route.useRouteContext()
  if (!ctx.user) {
    return <>Not Logged in</>
  }
  return <div>This is the main route! hello {ctx.user.name} </div>
}
