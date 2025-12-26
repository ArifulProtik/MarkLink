import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { trpc } from "@/lib/trpc";

export const TrpcProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient()
  const trpcClient = trpc.createClient({
    links: [
      httpBatchLink({
        url: 'http://localhost:3000/trpc',
        // async headers() {
        //   return {}
        // }
        // transformer: superjson,
        fetch(url, options) {
          return fetch(url, {
            ...options,
            credentials: 'include'
          })
        }
      })
    ],
  })
  return (
    <QueryClientProvider client={queryClient}>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        {children}
      </trpc.Provider>
    </QueryClientProvider>
  );
};
