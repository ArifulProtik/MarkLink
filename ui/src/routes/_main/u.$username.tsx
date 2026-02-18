import { createFileRoute } from '@tanstack/react-router'
import ProfileView from '@/components/profile/profile-view'

export const Route = createFileRoute('/_main/u/$username')({
  component: RouteComponent,
})

function RouteComponent() {
  const { username } = Route.useParams()
  return <ProfileView username={username} />
}
