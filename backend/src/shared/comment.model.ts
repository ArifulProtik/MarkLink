import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"
import { comment } from "@/db/schema/article.ts"
import { AuthorSchema } from "./article.model.ts"

export const CommentSchema = createSelectSchema(comment).extend({
  author: AuthorSchema,
})

export type CommentT = z.infer<typeof CommentSchema>

const _createComment = createInsertSchema(comment, {
  content: z.string().min(1, "Content is required"),
  article_id: z.uuid("Article id is required"),
})

export const CreateCommentBody = _createComment.pick({
  content: true,
  article_id: true,
})

export type CreateCommentBodyT = z.infer<typeof CreateCommentBody>

export const UpdateCommentBody = _createComment.pick({
  content: true,
})

export type UpdateCommentBodyT = z.infer<typeof UpdateCommentBody>

export const GetCommentsQuery = z.object({
  limit: z.string().optional().transform((val) => {
    const parsed = Number.parseInt(val ?? "", 10)
    return Number.isNaN(parsed) ? 20 : parsed
  }),
  offset: z.string().optional().transform((val) => {
    const parsed = Number.parseInt(val ?? "", 10)
    return Number.isNaN(parsed) ? 0 : parsed
  }),
})

export type GetCommentsQueryT = z.infer<typeof GetCommentsQuery>
