import { ToggleLike } from "@/services/like.service.ts"
import { ToggleLikeBody } from "@/shared/like.model.ts"
import { Controller } from "./controller.ts"

Controller.group("/like", (p) => {
  p.post(
    "/",
    async ({ body, user }) => await ToggleLike(body, user),
    {
      body: ToggleLikeBody,
      isAuth: true,
    },
  )

  return p
})
