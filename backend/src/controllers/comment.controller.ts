import { authMiddleware } from '@backend/middlewares/auth.middleware.ts'
import {
  CreateComment,
  DeleteComment,
  GetComments,
  ToggleCommentLike,
  UpdateComment,
} from '@backend/services/comment.service.ts'
import {
  CreateCommentBody,
  GetCommentsQuery,
  ToggleCommentLikeBody,
  UpdateCommentBody,
} from '@backend/shared/comment.model.ts'
import { Elysia } from 'elysia'

export const commentController = new Elysia({ prefix: '/comments' })
  .use(authMiddleware)
  .post('/', async ({ body, user }) => {
    return await CreateComment(body, user)
  }, {
    body: CreateCommentBody,
    isAuth: true,
  })
  .get('/:articleId', async ({ params: { articleId }, query, user }) => {
    return await GetComments(articleId, query, user)
  }, {
    query: GetCommentsQuery,
    isAuthOptional: true,
  })
  .patch('/id/:id', async ({ params: { id }, body, user }) => {
    return await UpdateComment(id, body, user)
  }, {
    body: UpdateCommentBody,
    isAuth: true,
  })
  .delete('/id/:id', async ({ params: { id }, user }) => {
    return await DeleteComment(id, user)
  }, {
    isAuth: true,
  })
  .post('/like', async ({ body, user }) => {
    return await ToggleCommentLike(body, user)
  }, {
    body: ToggleCommentLikeBody,
    isAuth: true,
  })
