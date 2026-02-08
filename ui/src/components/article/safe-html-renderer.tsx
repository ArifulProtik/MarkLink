import { useLayoutEffect, useRef } from 'react'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
import { cn } from '@/lib/utils'

type SafeHtmlRendererProps = {
  htmlContent: string
  className?: string
}

export const SafeHtmlRenderer = ({
  htmlContent,
  className,
}: SafeHtmlRendererProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentVersionRef = useRef(0)
  const lastHighlightedVersionRef = useRef(-1)

  useLayoutEffect(() => {
    contentVersionRef.current += 1
  })

  useLayoutEffect(() => {
    if (
      containerRef.current &&
      lastHighlightedVersionRef.current !== contentVersionRef.current
    ) {
      containerRef.current.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightElement(block as HTMLElement)
      })
      lastHighlightedVersionRef.current = contentVersionRef.current
    }
  })

  return (
    <div
      ref={containerRef}
      className={cn(
        'tiptap prose prose-lg dark:prose-invert max-w-none',
        'focus:outline-none min-h-125 outline-none',
        className,
      )}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  )
}
