import { Elysia } from "elysia"
import { authMiddleware } from "@/middlewares/auth.middleware.ts"
import { HttpError, SetupOnErorr } from "@/services/error.service.ts"

export const Controller = new Elysia()
  .error({
    HttpError,
  })
  .onError(({ error, set, code }) => {
    switch (code) {
      case "HttpError":
        return SetupOnErorr(error, set)
    }
  })
  .use(authMiddleware)
