import { z } from "zod"

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3 // 3MB
const ACCEPTED_FILE_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp"]

const fileSchema = z
  .instanceof(File)
  .refine((file) => {
    return !file || file.size <= MAX_UPLOAD_SIZE
  }, "File size must be less than 3MB")
  .refine((file) => {
    return !file || ACCEPTED_FILE_TYPES.includes(file.type)
  }, "File must be a valid image type (PNG, JPEG, JPG, WebP)")

export const UploadBody = z.object({
  file: fileSchema,
})
