import {
  CreateComment,
  DeleteComment,
  GetComments,
  UpdateComment,
} from "@/services/comment.service.ts"
import {
  CreateCommentBody,
  GetCommentsQuery,
  UpdateCommentBody,
} from "@/shared/comment.model.ts"
import { Controller } from "./controller.ts"

Controller.group("/comments", (app) => {
  app.post("/", async ({ body, user }) => {
    return await CreateComment(body, user)
  }, {
    body: CreateCommentBody,
    isAuth: true,
  })

  app.get("/:articleId", async ({ params: { articleId }, query }) => {
    return await GetComments(articleId, query)
  }, {
    query: GetCommentsQuery,
  })

  app.patch("/:id", async ({ params: { id }, body, user }) => {
    return await UpdateComment(id, body, user)
  }, {
    body: UpdateCommentBody,
    isAuth: true,
  })

  app.delete("/:id", async ({ params: { id }, user }) => {
    return await DeleteComment(id, user)
  }, {
    isAuth: true,
  })

  return app
})
