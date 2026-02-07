interface CommentViewProps {
  article_id: string
}

const CommentView = ({ article_id }: CommentViewProps) => {
  return <div>{article_id}</div>
}

export default CommentView
