import { Outlet, createFileRoute } from '@tanstack/react-router'
import { MainHeader } from '@ui/components/layout/main-header'

export const Route = createFileRoute('/_main')({
  component: RouteComponent,
})

function RouteComponent() {
  const ctx = Route.useRouteContext()
  return (
    <>
      <MainHeader User={ctx.user} />
      <Outlet />
    </>
  )
}
