import { createTRPCClient, httpBatchStreamLink } from '@trpc/client'
import { createTRPCContext } from '@trpc/tanstack-react-query'
import superjson from 'superjson'
import type { AppRouter } from '../../../src/@generated/server'

export const { TRPCProvider, useTRPC } = createTRPCContext<AppRouter>()

export const trpcClient = createTRPCClient<AppRouter>({
  links: [
    httpBatchStreamLink({
      transformer: superjson as any,
      url: 'http://localhost:3000/trpc',
      fetch(url, options) {
        return fetch(url, {
          ...options,
          credentials: 'include',
        })
      },
    }),
  ],
})
