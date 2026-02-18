import { article } from '@backend/db/schema/article.ts'
import { user } from '@backend/db/schema/auth.ts'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

export const AuthorSchema = createSelectSchema(user).pick({
  id: true,
  name: true,
  image: true,
  username: true,
})

export type AuthorT = z.infer<typeof AuthorSchema>

export const ArticleSchema = createSelectSchema(article).extend({
  author: AuthorSchema,
  likesCount: z.number(),
})

export type ArticleT = z.infer<typeof ArticleSchema>

const _createPost = createInsertSchema(article, {
  title: z.string().min(1, 'Title is required'),
  preview_text: z.string().min(1, 'Preview text is required'),
  content: z.string().min(1, 'Content is required'),
  preview_image: z.string().url('Invalid image URL'),
  tags: z.array(z.string()).min(3, 'At least 3 tags are required'),
})

export const CreatePostBody = _createPost.pick({
  title: true,
  preview_image: true,
  preview_text: true,
  content: true,
  tags: true,
})

export type CreatePostBodyT = z.infer<typeof CreatePostBody>

export const UpdatePostBody = CreatePostBody.partial()

export type UpdatePostBodyT = z.infer<typeof UpdatePostBody>

export const GetPostsQuery = z.object({
  limit: z.string().optional().transform((val) => {
    const parsed = Number.parseInt(val ?? '', 10)
    return Number.isNaN(parsed) ? 20 : parsed
  }),
  offset: z.string().optional().transform((val) => {
    const parsed = Number.parseInt(val ?? '', 10)
    return Number.isNaN(parsed) ? 0 : parsed
  }),
})

export type GetPostsQueryT = z.infer<typeof GetPostsQuery>

export const GetUserArticlesQuery = z.object({
  limit: z.number().min(1).max(100).default(20),
  offset: z.number().min(0).default(0),
})

export type GetUserArticlesQueryT = z.infer<typeof GetUserArticlesQuery>
