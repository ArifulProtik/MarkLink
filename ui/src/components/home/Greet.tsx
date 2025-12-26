import { useQuery } from "@tanstack/react-query"
import { useTRPC } from "@/lib/trpc"

export const Greet = () => {
  const trpc = useTRPC()
  const { data } = useQuery(trpc.postRouter.hello.queryOptions())
  return <div>{JSON.stringify(data)}</div>
}
