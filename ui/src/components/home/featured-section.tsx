import FeatureArticleCard from './feature-article-card'
import { GetFeaturedArticlesQuery } from '@/data/queries/article'

export default function FeaturedSection() {
  const { data } = GetFeaturedArticlesQuery()
  return (
    <div className="bg-muted/20">
      <div className="container-fluid-body py-12">
        <h2 className="text-2xl font-medium mb-4">Featured</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {data &&
            data.map((article) => (
              <FeatureArticleCard key={article.id} article={article} />
            ))}
        </div>
      </div>
    </div>
  )
}
