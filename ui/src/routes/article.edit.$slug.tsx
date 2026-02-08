import { createFileRoute, redirect } from '@tanstack/react-router'
import { EditComponent } from '@ui/components/write/edit-component'
import { GetArticleQueryOptions } from '@ui/data/queries/article'

export const Route = createFileRoute('/article/edit/$slug')({
  component: RouteComponent,
  ssr: false,
  loader: async ({ params, context: { queryClient, user } }) => {
    // Check if user is authenticated
    if (!user) {
      throw redirect({ to: '/' })
    }

    const article = await queryClient.fetchQuery(
      GetArticleQueryOptions(params.slug),
    )

    // Check if user is the author
    if (article.author_id !== user.id) {
      throw redirect({ to: '/' })
    }

    return { article }
  },
})

function RouteComponent() {
  const { article } = Route.useLoaderData()

  return <EditComponent article={article} />
}
