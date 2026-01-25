import { Controller } from "./controller.ts"

Controller.group("/post", post =>
  post.get("/", async ({ user }) => {
    return {
      hello: user,
    }
  }, { isAuth: true }))
