import type { SingleArticleResponse } from '@/lib/types'

interface FeaturedArtilceProps {
  article: SingleArticleResponse
}

export default function FeatureArticleCard({ article }: FeaturedArtilceProps) {
  return (
    <div className="border rounded-md p-4">
      <h3 className="text-lg font-medium">{article.title}</h3>
      <p className="text-muted-foreground">{article.preview_text}</p>
    </div>
  )
}
