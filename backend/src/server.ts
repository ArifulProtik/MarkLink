import { logger } from "@bogeychan/elysia-logger"
import { cors } from "@elysiajs/cors"
import { openapi } from "@elysiajs/openapi"
import { serverTiming } from "@elysiajs/server-timing"
import { Elysia } from "elysia"
import { articleController } from "./controllers/article.controller.ts"
import { commentController } from "./controllers/comment.controller.ts"
import { likeController } from "./controllers/like.controller.ts"
import { uploadController } from "./controllers/upload.controller.ts"
import { auth } from "./lib/auth.ts"

export const app = new Elysia({
  prefix: "/api/v1",
})
  .use(logger({
    level: "error",
  }))
  .use(cors())
  .use(serverTiming())
  .use(openapi(
    {
      provider: "scalar",
    },
  ))
  .mount(auth.handler)
  .use(uploadController)
  .use(articleController)
  .use(commentController)
  .use(likeController)
  .get("/health", () => {
    return {
      status: "ok",
    }
  })

export type App = typeof app
