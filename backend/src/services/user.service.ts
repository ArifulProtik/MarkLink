import { db } from '@backend/db/index.ts'
import { and, count, eq, or } from 'drizzle-orm'
import { follower, user } from '@backend/db/schema/auth.ts'
import { NotFoundError, InternalServerError } from './error.service.ts'
import { User } from 'better-auth'

export const checkFollowExist = async (
  followerID: string,
  followingID: string,
) => {
  const exists = await db.query.follower.findFirst({
    where: and(
      eq(follower.followerId, followerID),
      eq(follower.followingId, followingID),
    ),
  })
  if (exists) {
    return true
  }
  return false
}

export const followerCount = async (userID: string): Promise<number> => {
  const res = await db
    .select({ value: count() })
    .from(follower)
    .where(eq(follower.followingId, userID))

  if (!res) {
    return 0
  }
  return res[0]?.value || 0
}

export const isFriend = async (
  followerID: string,
  followingID: string,
): Promise<boolean> => {
  const mutual = await db
    .select()
    .from(follower)
    .where(
      or(
        and(
          eq(follower.followerId, followerID),
          eq(follower.followingId, followingID),
        ),
        and(
          eq(follower.followerId, followingID),
          eq(follower.followingId, followerID),
        ),
      ),
    )
  const Ok = mutual.length === 2
  return Ok
}

export const FollowUser = async (user: User, followingID: string) => {
  try {
    const exists = await checkFollowExist(user.id, followingID)
    if (exists) {
      return { success: true, message: 'User already followed' }
    }
    const inserted = await db.insert(follower).values({
      followerId: user.id,
      followingId: followingID,
    })
    if (!inserted) {
      throw new InternalServerError('Failed to follow user')
    }
    return { success: true, message: 'User followed successfully' }
  } catch (error) {
    if (error instanceof InternalServerError) {
      throw error
    }
    throw new InternalServerError('Failed to follow user', error)
  }
}

export const UnfollowUser = async (user: User, followingID: string) => {
  try {
    const exists = await checkFollowExist(user.id, followingID)
    if (!exists) {
      return { success: false, message: 'User not followed' }
    }
    const deleted = await db
      .delete(follower)
      .where(
        and(
          eq(follower.followerId, user.id),
          eq(follower.followingId, followingID),
        ),
      )
    if (!deleted) {
      throw new InternalServerError('Failed to unfollow user')
    }
    return { success: true, message: 'User unfollowed successfully' }
  } catch (error) {
    if (error instanceof InternalServerError) {
      throw error
    }
    throw new InternalServerError('Failed to unfollow user', error)
  }
}

export const GetUserWithUsername = async (
  Authuser: User | null,
  username: string,
) => {
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
    const count = await followerCount(userData.id)
    if (Authuser && Authuser.id != userData.id) {
      const isFollowed = await checkFollowExist(Authuser.id, userData.id)
      const isMutual = await isFriend(Authuser.id, userData.id)
      return {
        user: userData,
        followerCount: count,
        isFollowed: isFollowed,
        isFriend: isMutual,
      }
    }
    return {
      user: userData,
      followerCount: count,
    }
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error
    }
    throw new InternalServerError('Failed to fetch user', error)
  }
}
