import { authMiddleware } from '@backend/middlewares/auth.middleware.ts'
import { ToggleLike } from '@backend/services/like.service.ts'
import { ToggleLikeBody } from '@backend/shared/like.model.ts'
import { Elysia } from 'elysia'

export const likeController = new Elysia({ prefix: '/like' })
  .use(authMiddleware)
  .post(
    '/',
    async ({ body, user }) => await ToggleLike(body, user),
    {
      body: ToggleLikeBody,
      isAuth: true,
    },
  )
