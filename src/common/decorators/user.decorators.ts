import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IAppContext } from 'src/app.context';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const trpcRequest = ctx.getArgByIndex<{ ctx: IAppContext }>(0);
    if (!trpcRequest || !trpcRequest.ctx) {
      return null;
    }
    return trpcRequest.ctx.user;
  },
);
