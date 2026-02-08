import type {
  CreateCommentBodyT,
  GetCommentsQueryT,
  UpdateCommentBodyT,
} from '@backend/shared/comment.model.ts'
import type { User } from 'better-auth'
import { db } from '@backend/db/index.ts'
import { comment } from '@backend/db/schema/article.ts'
import {
  desc,
  eq,
  sql,
} from 'drizzle-orm'
import {
  ForbiddenError,
  InternalServerError,
  NotFoundError,
} from './error.service.ts'

export const CreateComment = async (body: CreateCommentBodyT, user: User) => {
  try {
    const [newComment] = await db.insert(comment).values({
      ...body,
      author_id: user.id,
    }).returning({ insertedId: comment.id })

    if (!newComment) {
      throw new InternalServerError('Failed to create comment')
    }

    const result = await db.query.comment.findFirst({
      where: eq(comment.id, newComment.insertedId),
      with: {
        author: {
          columns: {
            id: true,
            name: true,
            image: true,
            username: true,
          },
        },
      },
    })
    return result
  }
  catch (error) {
    throw new InternalServerError('Failed to create comment', error)
  }
}

export const GetComments = async (articleId: string, query: GetCommentsQueryT) => {
  try {
    const data = await db.query.comment.findMany({
      where: eq(comment.article_id, articleId),
      limit: query.limit,
      offset: query.offset,
      orderBy: [desc(comment.createdAt)],
      with: {
        author: {
          columns: {
            id: true,
            name: true,
            image: true,
            username: true,
          },
        },
      },
    })

    const [total] = await db.select({ count: sql<number>`count(*)` })
      .from(comment)
      .where(eq(comment.article_id, articleId))

    return {
      data,
      total: Number(total?.count ?? 0),
      limit: query.limit,
      offset: query.offset,
    }
  }
  catch (error) {
    throw new InternalServerError('Failed to fetch comments', error)
  }
}

export const UpdateComment = async (id: string, body: UpdateCommentBodyT, user: User) => {
  try {
    const existingComment = await db.query.comment.findFirst({
      where: eq(comment.id, id),
    })

    if (!existingComment) {
      throw new NotFoundError('Comment not found')
    }

    if (existingComment.author_id !== user.id) {
      throw new ForbiddenError('You are not authorized to update this comment')
    }

    const [updatedComment] = await db.update(comment)
      .set({
        ...body,
        updatedAt: new Date(),
      })
      .where(eq(comment.id, id))
      .returning()

    return updatedComment
  }
  catch (error) {
    if (error instanceof NotFoundError || error instanceof ForbiddenError) {
      throw error
    }
    throw new InternalServerError('Failed to update comment', error)
  }
}

export const DeleteComment = async (id: string, user: User) => {
  try {
    const existingComment = await db.query.comment.findFirst({
      where: eq(comment.id, id),
    })

    if (!existingComment) {
      throw new NotFoundError('Comment not found')
    }

    if (existingComment.author_id !== user.id) {
      throw new ForbiddenError('You are not authorized to delete this comment')
    }

    await db.delete(comment).where(eq(comment.id, id))

    return { success: true, message: 'Comment deleted successfully' }
  }
  catch (error) {
    if (error instanceof NotFoundError || error instanceof ForbiddenError) {
      throw error
    }
    throw new InternalServerError('Failed to delete comment', error)
  }
}
