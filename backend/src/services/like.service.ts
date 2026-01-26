import type { User } from "better-auth"
import type { ToggleLikeBodyT } from "@/shared/like.model.ts"
import { and, eq } from "drizzle-orm"
import { db } from "@/db/index.ts"
import { article, like } from "@/db/schema/article.ts"
import { InternalServerError, NotFoundError } from "./error.service.ts"

export const ToggleLike = async (body: ToggleLikeBodyT, user: User) => {
  try {
    const existingArticle = await db.query.article.findFirst({
      where: eq(article.id, body.articleId),
    })

    if (!existingArticle) {
      throw new NotFoundError("Article not found")
    }

    const existingLike = await db.query.like.findFirst({
      where: and(
        eq(like.article_id, body.articleId),
        eq(like.liker_id, user.id),
      ),
    })

    if (existingLike) {
      await db.delete(like).where(
        and(
          eq(like.article_id, body.articleId),
          eq(like.liker_id, user.id),
        ),
      )
      return { success: true, liked: false, message: "Article unliked successfully" }
    }

    await db.insert(like).values({
      article_id: body.articleId,
      liker_id: user.id,
    })

    return { success: true, liked: true, message: "Article liked successfully" }
  }
  catch (error) {
    if (error instanceof NotFoundError) {
      throw error
    }
    throw new InternalServerError("Failed to toggle like", error)
  }
}
