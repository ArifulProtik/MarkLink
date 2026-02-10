import { sanitizeHtml } from '@backend/lib/sanitize-html'
import {
  queryOptions,
  useMutation,
  useQuery,
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
    onSuccess: (article) => {
      toast.success('Article updated successfully')
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.GET_ARTICLE(article.slug),
      })
    },
    onError: () => {
      toast.error('Failed to update article')
    },
  })
}

export const GetCommentsQuery = (articleId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.GET_COMMENTS(articleId),
    queryFn: async () => {
      const res = await client.api.v1.comments({ articleId }).get({
        query: {
          limit: 20,
          offset: 0,
        },
      })
      if (!res.data) throw new Error('not found')
      return res.data
    },
  })
}

export const AddCommentMutation = (articleID: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (content: string) => {
      const { data, error } = await client.api.v1.comments.post({
        article_id: articleID,
        content,
      })
      if (error) throw error
      return data
    },
    onSuccess: () => {
      toast.success('Commented successfully.')
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.GET_COMMENTS(articleID),
      })
    },
    onError: () => {
      toast.error('Something went wrong.')
    },
  })
}

export const GetFeaturedArticlesQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_FEATURED_POSTS],
    queryFn: async () => {
      const res = await client.api.v1.article.featured.get()
      if (!res.data) throw new Error('not found')
      return res.data
    },
  })
}
