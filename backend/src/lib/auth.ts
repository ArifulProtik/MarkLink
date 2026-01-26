import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { nanoid } from "nanoid"
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
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          let baseName = user.name
            ? user.name.toLowerCase().replace(/\s+/g, "") // "John Doe" -> "johndoe"
            : user.email.split("@")[0] // fallback to email prefix

          baseName = baseName!.replace(/[^a-z0-9]/g, "")

          const uniqueSuffix = nanoid(4) // e.g., "ab12"
          const username = `${baseName}.${uniqueSuffix}`

          return {
            data: {
              ...user,
              username,
            },
          }
        },
      },
    },
  },
  user: {
    additionalFields: {
      username: {
        type: "string",
        returned: true,
      },
    },
  },
})
