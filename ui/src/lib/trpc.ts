import { createTRPCReact } from '@trpc/react-query'
import type { AppRouter } from '../../../src/@generated/server' // Path to your generated type

export const trpc = createTRPCReact<AppRouter>()
