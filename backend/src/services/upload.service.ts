/* eslint-disable node/prefer-global/buffer */
import { cloudinary } from "@backend/lib/cloudinary.ts"
import { InternalServerError } from "./error.service.ts"

export const ImageUploadService = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  const base64Data = `data:${file.type};base64,${buffer.toString("base64")}`

  try {
    const result = await cloudinary.uploader.upload(
      base64Data,
      {
        upload_preset: "ml_default",
      },
    )
    return {
      image_url: result.secure_url,
    }
  }
  catch (error) {
    throw new InternalServerError("Failed to upload image", error)
  }
}
