import { authMiddleware } from '@backend/middlewares/auth.middleware.ts'
import {
  FollowUser,
  GetUserWithUsername,
  UnfollowUser,
} from '@backend/services/user.service.ts'
import { Elysia } from 'elysia'

export const UserController = new Elysia({ prefix: '/users' })
  .use(authMiddleware)
  .get(
    '/:username',
    async ({ params: { username }, user }) =>
      await GetUserWithUsername(user, username),
    {
      isAuthOptional: true,
    },
  )
  .get(
    '/follow/:id',
    async ({ params: { id }, user }) => await FollowUser(user, id),
    {
      isAuth: true,
    },
  )
  .get(
    '/unfollow/:id',
    async ({ params: { id }, user }) => await UnfollowUser(user, id),
    {
      isAuth: true,
    },
  )
