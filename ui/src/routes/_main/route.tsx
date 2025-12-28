import { Outlet, createFileRoute } from '@tanstack/react-router'
import { MainHeader } from '@/components/layout/Mainheader'

export const Route = createFileRoute('/_main')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <MainHeader />
      <Outlet />
    </>
  )
}
