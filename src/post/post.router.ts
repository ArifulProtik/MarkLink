/* eslint-disable @typescript-eslint/require-await */
import { Query, Router } from 'nestjs-trpc';
import z from 'zod';

@Router()
export class PostRouter {
  @Query({ output: z.string() })
  async hello() {
    return 'Hello, World!';
  }
}
