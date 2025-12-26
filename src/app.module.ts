import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { TRPCModule } from 'nestjs-trpc';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { AppContext } from './app.context';
import superjson from 'superjson';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    TRPCModule.forRoot({
      autoSchemaFile: './src/@generated',
      context: AppContext,
      transformer: superjson,
    }),
    AuthModule,
    PostModule,
  ],
  controllers: [],
  providers: [AppContext],
})
export class AppModule {}
