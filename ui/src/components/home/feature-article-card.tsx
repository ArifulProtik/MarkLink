import { Link } from '@tanstack/react-router'
import type { Article } from '@/lib/types'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { simpleFormat } from '@/lib/dayjs'

interface FeaturedArtilceProps {
  article: Article
}

export default function FeatureArticleCard({ article }: FeaturedArtilceProps) {
  return (
    <Link to="/article/$slug" params={{ slug: article.slug }} className="group">
      <div className="flex flex-col gap-3 h-full">
        <div className="overflow-hidden">
          <img
            src={article.preview_image}
            alt={article.title}
            className="w-full aspect-video object-cover transition-transform
              duration-300 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-col flex-1 gap-2">
          <h3
            className="text-xl font-bold leading-tight decoration-2
              underline-offset-4 line-clamp-2"
          >
            {article.title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-3">
            {article.preview_text}
          </p>
        </div>

        <div
          className="flex items-center gap-2 mt-auto pt-2 text-sm
            text-muted-foreground justify-between w-full"
        >
          <div className="flex items-center gap-2">
            <Avatar size="sm">
              <AvatarImage src={article.author?.image || ''} />
              <AvatarFallback>{article.author?.name[0] || 'A'}</AvatarFallback>
            </Avatar>

            <div className="font-medium">{article.author?.name}</div>
          </div>
          <div>{simpleFormat(article.createdAt)}</div>
        </div>
      </div>
    </Link>
  )
}
