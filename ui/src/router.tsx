import { createRouter } from '@tanstack/react-router'

// Import the generated route tree
import { routeTree } from './routeTree.gen'
import { createQueryClient } from './lib/query-client'
import type { QueryClient } from '@tanstack/react-query'
import type { AppUser } from './lib/types'

export type AppRouteContext = {
  user: AppUser | null | undefined
  queryClient: QueryClient
}

// Create a new router instance
export const getRouter = () => {
  const queryClient = createQueryClient()
  const router = createRouter({
    defaultPreloadStaleTime: 0,
    routeTree,
    scrollRestoration: true,
    defaultPreload: false,
    context: { queryClient, user: undefined } as AppRouteContext,
  })
  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}
