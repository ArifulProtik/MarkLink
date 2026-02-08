import { createFileRoute, notFound } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import ArticleView from '@/components/article/article-view'
import { GetArticleQueryOptions } from '@/data/queries/article'

export const Route = createFileRoute('/_main/article/$slug')({
  component: RouteComponent,
  loader: async ({ params, context: { queryClient } }) => {
    try {
      await queryClient.ensureQueryData(GetArticleQueryOptions(params.slug))
    } catch {
      throw notFound()
    }
  },
  notFoundComponent: () => <div>Not found</div>,
})

function RouteComponent() {
  const { slug } = Route.useParams()
  const { user } = Route.useRouteContext()

  const { data: article } = useSuspenseQuery(GetArticleQueryOptions(slug))
  return <ArticleView article={article} author={user} />
}
