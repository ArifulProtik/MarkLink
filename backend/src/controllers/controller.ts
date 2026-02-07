import { HttpError, SetupOnErorr } from '@backend/services/error.service.ts'
import { Elysia } from 'elysia'

// Base controller with error handling - for reference only
// Controllers now directly use authMiddleware
export const baseErrorHandler = new Elysia()
  .error({
    HttpError,
  })
  .onError(({ error, set, code }) => {
    switch (code) {
      case 'HttpError':
        return SetupOnErorr(error, set)
    }
  })
