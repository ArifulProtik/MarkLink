import { createFileRoute } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'
import { Greet } from '@/components/home/Greet'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Greet />
      <Button variant="default">Default</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </>
  )
}
