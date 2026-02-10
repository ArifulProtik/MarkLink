import HeroSection from './hero-section'
import { useUser } from '@/hooks/use-user'

export function HomeComponent() {
  const user = useUser()
  return <>{!user && <HeroSection />}</>
}
