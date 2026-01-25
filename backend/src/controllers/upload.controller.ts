import { t } from "elysia"
import { ImageUploadService } from "@/services/upload.service.ts"
import { UploadBody } from "@/shared/models.ts"
import { Controller } from "./controller.ts"

Controller.post(
  "/upload",
  async ({ body: { file } }) => await ImageUploadService(file),
  {
    body: UploadBody,
    isAuth: true,
    response: {
      200: t.Object({
        image_url: t.String(),
      }),
    },
  },
)
