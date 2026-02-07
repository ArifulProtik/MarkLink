import { authMiddleware } from '@backend/middlewares/auth.middleware.ts'
import {
  CreatePost,
  DeletePost,
  GetPostBySlug,
  GetPosts,
  UpdatePost,
} from '@backend/services/article.service.ts'
import {
  CreatePostBody,
  GetPostsQuery,
  UpdatePostBody,
} from '@backend/shared/article.model.ts'
import { Elysia } from 'elysia'

export const articleController = new Elysia({ prefix: '/article' })
  .use(authMiddleware)
  .post(
    '/',
    async ({ body, user }) => await CreatePost(body, user),
    {
      body: CreatePostBody,
      isAuth: true,
    },
  )
  .get('/', async ({ query }) => await GetPosts(query), {
    query: GetPostsQuery,
  })
  .get('/:slug', async ({ params: { slug }, user }) => await GetPostBySlug(slug, user), {
    isAuthOptional: true,
  })
  .put(
    '/:id',
    async ({ params: { id }, body, user }) => await UpdatePost(id, body, user),
    {
      body: UpdatePostBody,
      isAuth: true,
    },
  )
  .delete(
    '/:id',
    async ({ params: { id }, user }) => await DeletePost(id, user),
    {
      isAuth: true,
    },
  )
