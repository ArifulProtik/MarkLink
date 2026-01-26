import { z } from "zod"

export const ToggleLikeBody = z.object({
  articleId: z.string(),
})

export type ToggleLikeBodyT = z.infer<typeof ToggleLikeBody>
