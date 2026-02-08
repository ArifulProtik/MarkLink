import { useEffect, useRef } from 'react'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

type SafeHtmlRendererProps = {
  htmlContent: string
  className?: string
}

export const SafeHtmlRenderer = ({
  htmlContent,
  className = '',
}: SafeHtmlRendererProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightElement(block as HTMLElement)
      })
    }
  }, [htmlContent])

  return (
    <div
      ref={containerRef}
      className={`tiptap prose prose-lg dark:prose-invert max-w-none
        focus:outline-none min-h-125 outline-none ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  )
}
