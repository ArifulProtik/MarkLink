import { useCallback, useRef } from 'react'
import ContentBar from './content-bar'
import CommentView from './comment-view'
import { SafeHtmlRenderer } from './safe-html-renderer'
import type { User } from 'better-auth'
import type { SingleArticleResponse } from '@/lib/types'
import { formatSmartTime } from '@/lib/dayjs'

interface ArticleViewProps {
  article: SingleArticleResponse
  author: User | null | undefined
}

const ArticleView = ({ article, author }: ArticleViewProps) => {
  const commentViewRef = useRef<HTMLDivElement>(null)

  const scrollToComments = useCallback(() => {
    commentViewRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }, [])

  return (
    <main className="max-w-2xl mx-auto px-3 pt-8">
      <div className="flex flex-col gap-6">
        <h1 className="text-4xl leading-tight font-bold font-sans">
          {article.title}
        </h1>
        {article.author && (
          <div className="flex items-center gap-3">
            <img
              src={article.author.image || ''}
              alt={article.author.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <p className="text-sm font-medium">{article.author.name}</p>
            <span className="text-muted-foreground">&middot;</span>
            <p
              className="text-sm text-muted-foreground"
              suppressHydrationWarning
            >
              {formatSmartTime(article.createdAt)}
            </p>
          </div>
        )}

        <img
          src={article.preview_image}
          alt={article.preview_text}
          className="aspect-video bg-cover h-78 w-full"
        />
        <ContentBar
          likesCount={article.likesCount}
          authorID={article.author_id}
          articleTitle={article.title}
          slug={article.slug}
          userID={author?.id}
          onCommentClick={scrollToComments}
          isLiked={article.isLikedByUser}
          articleID={article.id}
        />

        <SafeHtmlRenderer htmlContent={article.content} />
        <ContentBar
          likesCount={article.likesCount}
          authorID={article.author_id}
          articleTitle={article.title}
          slug={article.slug}
          userID={author?.id}
          onCommentClick={scrollToComments}
          isLiked={article.isLikedByUser}
          articleID={article.id}
        />

        <div ref={commentViewRef}>
          <CommentView article_id={article.id} />
        </div>
      </div>
    </main>
  )
}

export default ArticleView
