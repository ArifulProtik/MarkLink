import { sanitizeHtml } from '@backend/lib/sanitize-html'
import {
  queryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { toast } from 'sonner'
import { QUERY_KEYS } from './query-keys'
import type {
  CreatePostBodyT,
  UpdatePostBodyT,
} from '@backend/shared/article.model.ts'
import { client } from '@/lib/api'

export const GetArticleQueryOptions = (slug: string) =>
  queryOptions({
    queryKey: QUERY_KEYS.GET_ARTICLE(slug),
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
        queryKey: ['article'],
      })
    },
    onError: () => {
      toast.error('You are not authorized')
    },
  })
}

export function usePublishArticle() {
  return useMutation({
    mutationFn: async (data: CreatePostBodyT) => {
      const { data: res, error } = await client.api.v1.article.post(data)
      if (error) throw error
      return res
    },
    onError: () => {
      toast.error('Failed to publish story')
    },
  })
}

export function useUpdateArticle() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdatePostBodyT }) => {
      const { data: res, error } = await client.api.v1.article
        .id({ id })
        .put(data)
      if (error) throw error
      return res
    },
    onSuccess: () => {
      toast.success('Article updated successfully')
      queryClient.invalidateQueries({
        queryKey: ['article'],
      })
    },
    onError: () => {
      toast.error('Failed to update article')
    },
  })
}
