import HeroSection from './hero-section'
import FeaturedSection from './featured-section'
import { useUser } from '@/hooks/use-user'

export function HomeComponent() {
  const user = useUser()
  return (
    <>
      {!user && <HeroSection />}
      <FeaturedSection />
    </>
  )
}
