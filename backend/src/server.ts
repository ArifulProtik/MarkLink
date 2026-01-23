import { logger } from "@bogeychan/elysia-logger"
import { cors } from "@elysiajs/cors"
import { serverTiming } from "@elysiajs/server-timing"
import { swagger } from "@elysiajs/swagger"
import { Elysia } from "elysia"

export const app = new Elysia(
  { prefix: "/api/v1" },
)
  .use(logger({
    level: "error",
  }))
  .use(swagger())
  .use(cors())
  .use(serverTiming())
