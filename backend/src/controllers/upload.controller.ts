import { authMiddleware } from '@backend/middlewares/auth.middleware.ts'
import { ImageUploadService } from '@backend/services/upload.service.ts'
import { UploadBody } from '@backend/shared/models.ts'
import { Elysia } from 'elysia'
import { z } from 'zod'

export const uploadController = new Elysia()
  .use(authMiddleware)
  .post(
    '/upload',
    async ({ body: { file } }) => await ImageUploadService(file as File),
    {
      body: UploadBody,
      isAuth: true,
      response: {
        200: z.object({
          image_url: z.string(),
        }),
      },
    },
  )
