import { trpc } from '@/lib/trpc'

export const Greet = () => {
  const { data } = trpc.postRouter.hello.useQuery()
  return <div>{data}</div>
}
