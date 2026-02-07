import { treaty } from '@elysiajs/eden'
import type { App } from 'backend'

const isBrowser = typeof window !== 'undefined'
export const client = treaty<App>('http://localhost:3000', {
  fetch: {
    credentials: 'include',
  },
  onRequest: async () => {
    if (!isBrowser) {
      const { getRequestHeaders } = await import('@tanstack/react-start/server')
      return {
        headers: getRequestHeaders(),
      }
    }
  },
})
