import { TanStackDevtools } from '@tanstack/react-devtools'
import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import appCss from '../styles.css?url'
import type { AuthContext } from '@/router'
import { TrpcProvider } from '@/components/TrpcProvider'
import { getAuthSession } from '@/data/server-auth'

export const Route = createRootRoute({
  beforeLoad: async () => {
    const auth = await getAuthSession()
    return { user: auth.data?.user } satisfies AuthContext
  },
  head: () => ({
    links: [
      {
        href: appCss,
        rel: 'stylesheet',
      },
      {
        href: '/favicon.png',
        rel: 'icon',
        type: 'image/png',
      },
    ],
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        content: 'width=device-width, initial-scale=1',
        name: 'viewport',
      },
      {
        title: 'MarkLink',
      },
    ],
  }),

  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body suppressHydrationWarning>
        <TrpcProvider>{children}</TrpcProvider>
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
