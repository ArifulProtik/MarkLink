/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { TRPCModule } from 'nestjs-trpc';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    TRPCModule.forRoot({
      autoSchemaFile: './src/@generated',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
