/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { ContextOptions, TRPCContext } from 'nestjs-trpc';
import { auth } from './lib/auth'; // Your Better Auth instance
import { fromNodeHeaders } from 'better-auth/node';

type Session = typeof auth.$Infer.Session;

export interface IAppContext {
  user: Session['user'] | null;
  session: Session['session'] | null;
}
@Injectable()
export class AppContext implements TRPCContext {
  async create(opts: ContextOptions) {
    const { req } = opts;

    // Convert Node headers to Web Headers for Better Auth
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    return {
      user: session?.user ?? null,
      session: session?.session ?? null,
    };
  }
}
