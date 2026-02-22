import type { User } from 'better-auth'

export type AppUser = User & {
  username: string
}

export type UserPublic = {
  user: AppUser
  followerCount: number
  isFollowed: boolean
  isFriend: boolean
}

export type Article = {
  id: string
  slug: string
  title: string
  content?: string
  preview_image: string
  preview_text: string
  likesCount: number
  author: UserPublic | null
  author_id: string
  tags: Array<string>
  createdAt: Date
  updatedAt: Date
}

export type Comment = {
  isLikedByUser: boolean
  author: UserPublic | null
  likesCount: number
  content: string
  author_id: string
  article_id: string
  id: string
  createdAt: Date
  updatedAt: Date
}

export type SingleArticleResponse = Article & {
  isLikedByUser: boolean
}
