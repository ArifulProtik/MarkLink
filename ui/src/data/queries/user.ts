import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from './query-keys'
import { client } from '@/lib/api'

export const GetUserWithUserNameQuery = (username: string) =>
  useQuery({
    queryKey: QUERY_KEYS.GET_USER(username),
    queryFn: async () => {
      const res = await client.api.v1.users({ username }).get()
      if (!res.data) throw new Error('Not found')
      return res.data
    },
  })

export const GetUserArticlesQuery = (userId: string) =>
  useQuery({
    queryKey: QUERY_KEYS.GET_USER_ARTICLES(userId),
    queryFn: async () => {
      const res = await client.api.v1.article.user({ id: userId }).get()
      if (!res.data) throw new Error('Not found')
      return res.data
    },
  })
