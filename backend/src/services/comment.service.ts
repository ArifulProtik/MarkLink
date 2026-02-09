import type {
  CreateCommentBodyT,
  GetCommentsQueryT,
  ToggleCommentLikeBodyT,
  UpdateCommentBodyT,
} from '@backend/shared/comment.model.ts'
import type { User } from 'better-auth'
import { db } from '@backend/db/index.ts'
import { comment, commentLike } from '@backend/db/schema/article.ts'
import { user as userSchema } from '@backend/db/schema/auth.ts'
import {
  and,
  count,
  desc,
  eq,
  getTableColumns,
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

export const GetComments = async (
  articleId: string,
  query: GetCommentsQueryT,
  user: User | null,
) => {
  try {
    const commentsData = await db
      .select({
        ...getTableColumns(comment),
        author: {
          id: userSchema.id,
          name: userSchema.name,
          image: userSchema.image,
          username: userSchema.username,
        },
        likesCount: count(commentLike.id),
      })
      .from(comment)
      .leftJoin(userSchema, eq(comment.author_id, userSchema.id))
      .leftJoin(commentLike, eq(comment.id, commentLike.comment_id))
      .where(eq(comment.article_id, articleId))
      .groupBy(comment.id, userSchema.id)
      .limit(query.limit)
      .offset(query.offset)
      .orderBy(desc(comment.createdAt))

    const commentsWithLikeStatus = await Promise.all(
      commentsData.map(async (c) => {
        let isLikedByUser = false
        if (user) {
          const [existingLike] = await db
            .select()
            .from(commentLike)
            .where(
              and(
                eq(commentLike.comment_id, c.id),
                eq(commentLike.liker_id, user.id),
              ),
            )
          if (existingLike) {
            isLikedByUser = true
          }
        }
        return {
          ...c,
          isLikedByUser,
        }
      }),
    )

    const [total] = await db
      .select({ count: sql<number>`count(*)` })
      .from(comment)
      .where(eq(comment.article_id, articleId))

    return {
      data: commentsWithLikeStatus,
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

export const ToggleCommentLike = async (
  body: ToggleCommentLikeBodyT,
  user: User,
) => {
  try {
    const existingComment = await db.query.comment.findFirst({
      where: eq(comment.id, body.commentId),
    })

    if (!existingComment) {
      throw new NotFoundError('Comment not found')
    }

    const [existingLike] = await db
      .select()
      .from(commentLike)
      .where(
        and(
          eq(commentLike.comment_id, body.commentId),
          eq(commentLike.liker_id, user.id),
        ),
      )

    if (existingLike) {
      await db
        .delete(commentLike)
        .where(eq(commentLike.id, existingLike.id))
      return { liked: false }
    }

    await db.insert(commentLike).values({
      comment_id: body.commentId,
      liker_id: user.id,
    })

    return { liked: true }
  }
  catch (error) {
    if (error instanceof NotFoundError) {
      throw error
    }
    throw new InternalServerError('Failed to toggle comment like', error)
  }
}
