import { z } from "zod"
import { ImageUploadService } from "@/services/upload.service.ts"
import { UploadBody } from "@/shared/models.ts"
import { Controller } from "./controller.ts"

Controller.post(
  "/upload",
  async ({ body: { file } }) => await ImageUploadService(file as File),
  {
    body: UploadBody,
    isAuth: true,
    response: {
      200: z.object({
        image_url: z.string(),
      }),
    },
  },
)
