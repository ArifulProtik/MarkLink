import { config } from '@backend/config.ts'
import * as schema from '@backend/db/schema/index.ts'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

const client = postgres(config.DATABASE_URL)
export const db = drizzle({
  client,
  schema,
  casing: 'snake_case',
})
