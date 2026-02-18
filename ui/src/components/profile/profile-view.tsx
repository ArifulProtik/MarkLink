import ProfileSection from './profile-section'
import UserArticle from './user-article'
import { useGetUserWithUserNameQuery } from '@/data/queries/user'

interface ProfileViewProps {
  username: string
}

export default function ProfileView({ username }: ProfileViewProps) {
  const {
    data: user,
    isLoading: isLoadingUser,
    isError,
  } = useGetUserWithUserNameQuery(username)

  if (isError) {
    return (
      <div className="container-fluid">
        <div className="flex items-center justify-center py-12">
          <p className="text-destructive">Failed to load user profile</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container-fluid">
      <div className="flex flex-col md:flex-row w-full">
        <div className="md:w-3/12 w-full py-4">
          {isLoadingUser ? (
            <div className="flex items-center justify-center">Loading...</div>
          ) : (
            user && <ProfileSection user={user} />
          )}
        </div>
        <div
          className="flex-1 md:py-4 py-0 md:border-l md:pl-6 md:border-t-0
            border-t"
        >
          {!isLoadingUser && user && <UserArticle userID={user.id} />}
        </div>
      </div>
    </div>
  )
}
