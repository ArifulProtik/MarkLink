import ArticleCard from '../home/article-card'
import { useGetUserArticlesQuery } from '@/data/queries/user'

interface UserArticleProps {
  userID: string
}

export default function UserArticle({ userID }: UserArticleProps) {
  const { data, isLoading, isError, error } = useGetUserArticlesQuery(userID)

  if (isError) {
    return (
      <div className="py-4 text-destructive">
        Failed to load articles
        <p className="text-sm text-muted-foreground">{error.message}</p>
      </div>
    )
  }

  return (
    <div>
      {isLoading
        ? 'Loading...'
        : data?.data && data.data.length > 0
          ? data.data.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))
          : 'No articles'}
    </div>
  )
}
