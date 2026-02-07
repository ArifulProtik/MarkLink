import type {
  CreatePostBodyT,
  GetPostsQueryT,
  UpdatePostBodyT,
} from '@backend/shared/article.model.ts'
import type { User } from 'better-auth'
import { db } from '@backend/db/index.ts'
import { article, like } from '@backend/db/schema/article.ts'
import { user as userSchema } from '@backend/db/schema/auth.ts'
import {
  count,
  desc,
  eq,
  getTableColumns,
  sql,
} from 'drizzle-orm'
import { v7 as uuidv7 } from 'uuid'
import {
  ForbiddenError,
  InternalServerError,
  NotFoundError,
} from './error.service.ts'

const GenerateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-')
    .concat(`-${uuidv7()}`)
}

export const CreatePost = async (body: CreatePostBodyT, user: User) => {
  try {
    const [newArticle] = await db
      .insert(article)
      .values({
        ...body,
        slug: GenerateSlug(body.title),
        author_id: user.id,
      })
      .returning({ insertedId: article.id })
    if (!newArticle) {
      throw new InternalServerError('Failed to create post')
    }
    const result = await db.query.article.findFirst({
      where: eq(article.id, newArticle!.insertedId),
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
    return {
      ...result,
      likesCount: 0,
    }
  }
  catch (error) {
    throw new InternalServerError('Failed to create post', error)
  }
}

export const GetPosts = async (query: GetPostsQueryT) => {
  try {
    const data = await db
      .select({
        ...getTableColumns(article),
        author: {
          id: userSchema.id,
          name: userSchema.name,
          image: userSchema.image,
          username: userSchema.username,
        },
        likesCount: count(like.id),
      })
      .from(article)
      .leftJoin(userSchema, eq(article.author_id, userSchema.id))
      .leftJoin(like, eq(article.id, like.article_id))
      .groupBy(article.id, userSchema.id)
      .limit(query.limit)
      .offset(query.offset)
      .orderBy(desc(article.createdAt))

    const [total] = await db
      .select({ count: sql<number>`count(*)` })
      .from(article)

    return {
      data,
      total: Number(total?.count ?? 0),
      limit: query.limit,
      offset: query.offset,
    }
  }
  catch (error) {
    throw new InternalServerError('Failed to fetch posts', error)
  }
}

export const GetPostBySlug = async (slug: string) => {
  try {
    const [post] = await db
      .select({
        ...getTableColumns(article),
        author: {
          id: userSchema.id,
          name: userSchema.name,
          image: userSchema.image,
          username: userSchema.username,
        },
        likesCount: count(like.id),
      })
      .from(article)
      .leftJoin(userSchema, eq(article.author_id, userSchema.id))
      .leftJoin(like, eq(article.id, like.article_id))
      .where(eq(article.slug, slug))
      .groupBy(article.id, userSchema.id)

    if (!post) {
      throw new NotFoundError('Article not found')
    }

    return post
  }
  catch (error) {
    if (error instanceof NotFoundError) {
      throw error
    }
    throw new InternalServerError('Failed to fetch post', error)
  }
}

export const UpdatePost = async (
  id: string,
  body: UpdatePostBodyT,
  user: User,
) => {
  try {
    const post = await db.query.article.findFirst({
      where: eq(article.id, id),
    })

    if (!post) {
      throw new NotFoundError('Article not found')
    }

    if (post.author_id !== user.id) {
      throw new ForbiddenError('You are not authorized to update this post')
    }

    const [updatedPost] = await db
      .update(article)
      .set({
        ...body,
        updatedAt: new Date(),
      })
      .where(eq(article.id, id))
      .returning()

    return updatedPost
  }
  catch (error) {
    if (error instanceof NotFoundError || error instanceof ForbiddenError) {
      throw error
    }
    throw new InternalServerError('Failed to update post', error)
  }
}

export const DeletePost = async (id: string, user: User) => {
  try {
    const post = await db.query.article.findFirst({
      where: eq(article.id, id),
    })

    if (!post) {
      throw new NotFoundError('Article not found')
    }

    if (post.author_id !== user.id) {
      throw new ForbiddenError('You are not authorized to delete this post')
    }

    await db.delete(article).where(eq(article.id, id))

    return { success: true, message: 'Article deleted successfully' }
  }
  catch (error) {
    if (error instanceof NotFoundError || error instanceof ForbiddenError) {
      throw error
    }
    throw new InternalServerError('Failed to delete post', error)
  }
}
