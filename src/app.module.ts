/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { TRPCModule } from 'nestjs-trpc';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    TRPCModule.forRoot({
      autoSchemaFile: './src/@generated',
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
