import { v2 as cloudinary } from "cloudinary"
import { config } from "@/config.ts"

if (config.CLOUDINARY_URL) {
  // Use the URL directly if possible, or parse it for explicit config
  const url = config.CLOUDINARY_URL
  if (url.startsWith("cloudinary://")) {
    const withoutProtocol = url.replace("cloudinary://", "")
    const [auth, cloudName] = withoutProtocol.split("@")
    if (auth && cloudName) {
      const [apiKey, apiSecret] = auth.split(":")
      cloudinary.config({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret,
        secure: false,
        upload_preset: "ml_default",
      })
    }
  }
}

export { cloudinary }
