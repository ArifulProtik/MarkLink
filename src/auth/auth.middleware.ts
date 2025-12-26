/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { TRPCMiddleware, MiddlewareOptions } from 'nestjs-trpc';
import { TRPCError } from '@trpc/server';
import { IAppContext } from 'src/app.context';

@Injectable()
export class AuthMiddleware implements TRPCMiddleware {
  async use(opts: MiddlewareOptions<IAppContext>) {
    const { ctx, next } = opts;

    // If no user is found in the context we built in Step 1
    if (!ctx.user) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'You must be logged in to access this route',
      });
    }

    // Continue to the procedure
    return next();
  }
}
