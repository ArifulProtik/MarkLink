import { db } from '@backend/db/index.ts'
import { eq } from 'drizzle-orm'
import { user } from '@backend/db/schema/auth.ts'
import { NotFoundError, InternalServerError } from './error.service.ts'

export const GetUserWithUsername = async (username: string) => {
  try {
    const userData = await db.query.user.findFirst({
      where: eq(user.username, username),
      columns: {
        id: true,
        name: true,
        username: true,
        image: true,
      },
    })
    if (!userData) {
      throw new NotFoundError('User not found')
    }
    return userData
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error
    }
    throw new InternalServerError('Failed to fetch user', error)
  }
}
