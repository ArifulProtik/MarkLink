import { Link } from '@tanstack/react-router'
import type { Article } from '@/lib/types'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { simpleFormat } from '@/lib/dayjs'

interface ArticleCardProps {
  article: Article
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link to="/article/$slug" params={{ slug: article.slug }} className="group">
      <div className="flex flex-col gap-4 h-full border-b pb-8 last:border-b-0">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={article.author?.image || ''} />
            <AvatarFallback>{article.author?.name[0] || 'A'}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{article.author?.name}</span>
        </div>

        <div className="flex gap-6 lg:gap-12 justify-between items-start">
          <div className="flex flex-col gap-2 flex-1">
            <h3 className="text-xl font-bold leading-tight">{article.title}</h3>
            <p
              className="text-muted-foreground line-clamp-2 md:line-clamp-3
                text-base"
            >
              {article.preview_text}
            </p>
            <div
              suppressHydrationWarning
              className="mt-auto pt-2 text-sm text-muted-foreground"
            >
              {simpleFormat(article.createdAt)}
            </div>
          </div>

          {article.preview_image && (
            <div className="shrink-0">
              <img
                src={article.preview_image}
                alt={article.title}
                className="w-24 h-24 md:w-36 md:h-24 object-cover rounded-sm"
              />
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
