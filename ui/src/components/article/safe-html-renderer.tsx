import { useLayoutEffect, useMemo, useRef } from 'react'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
import DOMPurify from 'dompurify'
import { cn } from '@/lib/utils'

type SafeHtmlRendererProps = {
  /**
   * HTML content to render. This content should already be sanitized upstream
   * as a best practice; client-side sanitization here is an additional safety measure.
   */
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

  // Client-side sanitization as a last line of defense
  const safeHtml = useMemo(() => {
    return DOMPurify.sanitize(htmlContent)
  }, [htmlContent])

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
      dangerouslySetInnerHTML={{ __html: safeHtml }}
    />
  )
}
