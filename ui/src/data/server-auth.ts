import { createServerFn } from '@tanstack/react-start'
import { getRequest } from '@tanstack/react-start/server'
import { authClient } from '@/lib/auth-client'

export const getAuthSession = createServerFn({ method: 'GET' }).handler(
  async () => {
    const headers = getRequest().headers
    const session = await authClient.getSession({
      fetchOptions: {
        headers: headers,
      },
    })
    return session
  },
)
