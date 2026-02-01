import { authMiddleware } from "@backend/middlewares/auth.middleware.ts"
import {
  CreateComment,
  DeleteComment,
  GetComments,
  UpdateComment,
} from "@backend/services/comment.service.ts"
import {
  CreateCommentBody,
  GetCommentsQuery,
  UpdateCommentBody,
} from "@backend/shared/comment.model.ts"
import { Elysia } from "elysia"

export const commentController = new Elysia({ prefix: "/comments" })
  .use(authMiddleware)
  .post("/", async ({ body, user }) => {
    return await CreateComment(body, user)
  }, {
    body: CreateCommentBody,
    isAuth: true,
  })
  .get("/:articleId", async ({ params: { articleId }, query }) => {
    return await GetComments(articleId, query)
  }, {
    query: GetCommentsQuery,
  })
  .patch("/:id", async ({ params: { id }, body, user }) => {
    return await UpdateComment(id, body, user)
  }, {
    body: UpdateCommentBody,
    isAuth: true,
  })
  .delete("/:id", async ({ params: { id }, user }) => {
    return await DeleteComment(id, user)
  }, {
    isAuth: true,
  })
