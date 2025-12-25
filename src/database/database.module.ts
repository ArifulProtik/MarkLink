/* eslint-disable @typescript-eslint/require-await */
import { Global, Module } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { db } from './db';
import * as schema from './schema';

export const DRIZZLE_DB = Symbol('DRIZZLE_DB');
export type DrizzleDB = NodePgDatabase<typeof schema>;

@Global()
@Module({
  providers: [
    {
      provide: DRIZZLE_DB,
      useFactory: async (): Promise<DrizzleDB> => {
        return db;
      },
    },
  ],
  exports: [DRIZZLE_DB],
})
export class DatabaseModule {}
