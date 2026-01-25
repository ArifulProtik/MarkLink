import env from "env-var"

export const config = {
  NODE_ENV: env
    .get("NODE_ENV")
    .default("development")
    .asEnum(["production", "test", "development"]),

  PORT: env.get("PORT").default(3000).asPortNumber(),
  DATABASE_URL: env.get("DATABASE_URL").required().asString(),
  REDIS_HOST: env.get("REDIS_HOST").default("localhost").asString(),
  GITHUB_CLIENT_ID: env.get("GITHUB_CLIENT_ID").required().asString(),
  GITHUB_CLIENT_SECRET: env.get("GITHUB_CLIENT_SECRET").required().asString(),
  UI_CLIENT_URL: env.get("UI_CLIENT_URL").required().asString(),
  CLOUDINARY_URL: env.get("CLOUDINARY_URL").required().asString(),
}
