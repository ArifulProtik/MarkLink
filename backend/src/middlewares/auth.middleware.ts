import type { User } from 'better-auth'
import { auth } from '@backend/lib/auth.ts'
import { UnauthorizedError } from '@backend/services/error.service.ts'
import { Elysia } from 'elysia'

export const authMiddleware = new Elysia()

  .derive({ as: 'global' }, () => {
    return {
      user: null as User | null,
    }
  })

  .macro({
    isAuth: {
      async resolve({ headers }) {
        const session = await auth.api.getSession({ headers })
        if (session) {
          return {
            user: session.user,
          }
        }
        throw new UnauthorizedError(
          'You are not authorized to access this resource. please sign in',
        )
      },
    },

    isAuthOptional: {
      async resolve({ headers }) {
        const session = await auth.api.getSession({ headers })
        if (session) {
          return {
            user: session.user,
          }
        }
        return {
          user: null,
        }
      },
    },
  })
