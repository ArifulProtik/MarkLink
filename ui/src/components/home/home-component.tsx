import HeroSection from './hero-section'
import FeaturedSection from './featured-section'
import ArticleSection from './article-section'
import { useUser } from '@/hooks/use-user'

export function HomeComponent() {
  const user = useUser()
  return (
    <>
      {!user && <HeroSection />}
      <FeaturedSection />
      <ArticleSection />
    </>
  )
}
