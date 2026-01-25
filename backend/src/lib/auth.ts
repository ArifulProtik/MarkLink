import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { config } from "@/config.ts"
import { db } from "@/db/index.ts"

export const auth = betterAuth({
  database: drizzleAdapter(
    db,
    { provider: "pg" },
  ),
  socialProviders: {
    github: {
      clientId: config.GITHUB_CLIENT_ID,
      clientSecret: config.GITHUB_CLIENT_SECRET,
    },
  },
  trustedOrigins: [config.UI_CLIENT_URL],
  baseURL: `http://localhost:${config.PORT}/api/v1/auth`,

})
