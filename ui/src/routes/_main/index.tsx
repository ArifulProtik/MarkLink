import { createFileRoute } from '@tanstack/react-router'
import { HomeComponent } from '@ui/components/home/home-component'

export const Route = createFileRoute('/_main/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <HomeComponent />
}
