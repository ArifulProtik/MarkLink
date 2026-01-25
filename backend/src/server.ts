import { logger } from "@bogeychan/elysia-logger"
import { cors } from "@elysiajs/cors"
import { openapi } from "@elysiajs/openapi"
import { serverTiming } from "@elysiajs/server-timing"
import { Elysia } from "elysia"
import { Controller } from "./controllers/controller.ts"
import { auth } from "./lib/auth.ts"
import "./controllers/upload.controller.ts"
import "./controllers/post.controller.ts"

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
  .use(Controller)

app.get("/health", () => {
  return {
    status: "ok",
  }
})
