export const QUERY_KEYS = {
  GET_ARTICLE: (slug: string) => ['article', slug] as const,
  GET_COMMENTS: (id: string) => ['comments', id] as const,
}
