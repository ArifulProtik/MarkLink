import { config } from './config.ts'
import { app } from './server.ts'

const signals = ['SIGINT', 'SIGTERM']
const banner = `
-------------------------------------
  SERVER STARTED SUCCESSFULLY
  Runtime: Bun v${Bun.version}
  Framework: Elysia 
  Port: ${config.PORT}
  Environment: ${config.NODE_ENV}
-------------------------------------
`

for (const signal of signals) {
  process.on(signal, async () => {
    console.log(`Received ${signal}. Initiating graceful shutdown...`)
    await app.stop()
    process.exit(0)
  })
}

process.on('uncaughtException', (error) => {
  console.error(error)
})

process.on('unhandledRejection', (error) => {
  console.error(error)
})

app.listen(
  config.PORT,
  () => {
    if (config.NODE_ENV === 'development') {
      console.log(banner)
    }
    else {
      console.log(`Server running for production`)
    }
  },
)
