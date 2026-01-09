import { createRouter } from '@tanstack/react-router'

// Import the generated route tree
import { routeTree } from './routeTree.gen'
import type { User } from 'better-auth'

export type AuthContext = {
  user: User | null | undefined
}

// Create a new router instance
export const getRouter = () => {
  const router = createRouter({
    defaultPreloadStaleTime: 0,
    routeTree,
    scrollRestoration: true,
    defaultPreload: false,
    context: undefined as unknown as AuthContext,
  })

  return router
}
declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}
