import { Module } from '@nestjs/common';
import { PostRouter } from './post.router';

@Module({
  providers: [PostRouter],
})
export class PostModule {}
