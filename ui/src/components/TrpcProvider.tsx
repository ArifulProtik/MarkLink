import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import superjson from "superjson";
import { useState } from 'react'
import { TRPCProvider, trpcClient } from '@/lib/trpc'

export const TrpcProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        {children}
      </TRPCProvider>
    </QueryClientProvider>
  )
}
