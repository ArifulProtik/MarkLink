import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthMiddleware } from './auth.middleware';

@Module({
  controllers: [AuthController],
  providers: [AuthMiddleware],
  exports: [AuthMiddleware],
})
export class AuthModule {}
