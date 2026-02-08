import { sanitizeHtml } from '@backend/lib/sanitize-html'
import {
  queryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { toast } from 'sonner'
import { QUERY_KEYS } from './query-keys'
import { client } from '@/lib/api'

export const GetArticleQueryOptions = (slug: string) =>
  queryOptions({
    queryKey: [QUERY_KEYS.GET_ARTICLE, slug],
    queryFn: async () => {
      const res = await client.api.v1.article({ slug }).get()
      if (!res.data) throw new Error('Not found')

      return {
        ...res.data,
        content: sanitizeHtml(res.data.content),
      }
    },
  })

export function useToggleArticleLike() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (articleId: string) => {
      return client.api.v1.like.post({ articleId })
    },
    onSuccess: (data) => {
      toast.success(data.data?.message)
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ARTICLE],
      })
    },
    onError: () => {
      toast.error('You are not authorized')
    },
  })
}
