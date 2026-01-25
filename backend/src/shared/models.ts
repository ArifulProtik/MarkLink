import { t } from "elysia"

export const UploadBody = t.Object({
  file: t.File({
    type: ["image/png", "image/jpeg", "image/jpg", "image/webp"],
    maxSize: "10m",
  }),
})
