import type { User } from "better-auth"
import { Elysia } from "elysia"
import { auth } from "@/lib/auth.ts"
import { UnauthorizedError } from "@/services/error.service.ts"

export const authMiddleware = new Elysia()

  .derive({ as: "global" }, () => {
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
        throw new UnauthorizedError("You are not authorized to access this resource. please sign in")
      },
    },
  })
