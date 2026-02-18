import ArticleCard from '../home/article-card'
import { GetUserArticlesQuery } from '@/data/queries/user'

interface UserArticleProps {
  userID: string
}

export default function UserArticle({ userID }: UserArticleProps) {
  const { data, isLoading } = GetUserArticlesQuery(userID)
  return (
    <div>
      {isLoading
        ? 'Loading...'
        : data && data.length > 0
          ? data.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))
          : 'No articles'}
    </div>
  )
}
