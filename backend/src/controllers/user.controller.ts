import { authMiddleware } from '@backend/middlewares/auth.middleware.ts'
import { GetUserWithUsername } from '@backend/services/user.service.ts'
import { Elysia } from 'elysia'

export const UserController = new Elysia({ prefix: '/users' })
  .use(authMiddleware)
  .get(
    '/:username',
    async ({ params: { username } }) => await GetUserWithUsername(username),
    {
      isAuthOptional: true,
    },
  )
