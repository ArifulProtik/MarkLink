import { useState } from 'react'
import ArticleCard from './article-card'
import { GetArticlesQuery } from '@/data/queries/article'
import { Button } from '@/components/ui/button'

export default function ArticleSection() {
  const [page, setPage] = useState(0)
  const limit = 10
  const { data, isLoading, isError } = GetArticlesQuery(page * limit, limit)

  const hasNextPage = data ? (page + 1) * limit < data.total : false

  return (
    <div className="container-fluid-body py-12">
      <h2 className="text-2xl font-medium mb-8">For You</h2>

      <div className="flex flex-col gap-8 mb-8">
        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>Error loading articles</div>
        ) : (
          data?.data.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))
        )}
      </div>

      <div className="flex gap-2 justify-center items-center">
        <Button
          variant="outline"
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0 || isLoading}
        >
          Previous
        </Button>
        <span className="px-4 py-2 text-sm font-medium"> {page + 1}</span>
        <Button
          variant="outline"
          onClick={() => setPage((p) => p + 1)}
          disabled={isLoading || !hasNextPage}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
