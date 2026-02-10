import AddComment from './add-comment'
import SingleComment from './comment'
import { GetCommentsQuery } from '@/data/queries/article'
import { useUser } from '@/hooks/use-user'

interface CommentViewProps {
  article_id: string
}

const CommentView = ({ article_id }: CommentViewProps) => {
  const user = useUser()
  const { data: comments } = GetCommentsQuery(article_id)

  return (
    <div className="w-full mb-10 py-6" suppressHydrationWarning>
      <div className="flex flex-col gap-4">
        <h2 className="font-semibold text-xl">Comments</h2>
        {user && <AddComment user={user} article_id={article_id} />}

        {comments && comments.data.length === 0 ? (
          <p className="text-center mx-auto"> No Comments Yet </p>
        ) : (
          comments &&
          comments.data.map((c) => (
            <SingleComment key={c.id} comment={c} userID={user?.id} />
          ))
        )}
      </div>
    </div>
  )
}

export default CommentView
