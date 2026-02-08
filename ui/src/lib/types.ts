export type UserPublic = {
  id: string
  name: string
  image: string | null
  username: string
}

export type Article = {
  id: string
  slug: string
  title: string
  content: string
  preview_image: string
  preview_text: string
  likesCount: number
  author: UserPublic | null
  author_id: string
  tags: Array<string>
  createdAt: Date
  updatedAt: Date
}

export type SingleArticleResponse = Article & {
  isLikedByUser: boolean
}
