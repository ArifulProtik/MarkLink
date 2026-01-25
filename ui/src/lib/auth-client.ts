import { createAuthClient } from 'better-auth/react'

export const authClient = createAuthClient({
  baseURL:
    import.meta.env.VITE_SERVER_URL || 'http://localhost:3000/api/v1/auth',
})

export const { signIn, signOut, signUp, useSession } = authClient
