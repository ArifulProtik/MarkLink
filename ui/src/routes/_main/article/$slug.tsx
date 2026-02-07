import { createFileRoute, notFound } from '@tanstack/react-router'
import { client } from '@/lib/api'
import ArticleView from '@/components/article/article-view'

export const Route = createFileRoute('/_main/article/$slug')({
  component: RouteComponent,
  loader: async ({ params, context }) => {
    const { slug } = params
    try {
      const res = await client.api.v1.article({ slug }).get()
      if (res.data) {
        return {
          article: res.data,
          user: context.user,
        }
      }
      throw notFound()
    } catch {
      throw notFound()
    }
  },
  notFoundComponent: () => <div>Not found</div>,
})

function RouteComponent() {
  const data = Route.useLoaderData()
  return <ArticleView article={data.article} author={data.user} />
}
