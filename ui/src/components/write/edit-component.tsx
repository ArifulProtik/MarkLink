import * as React from 'react'
import EditorComponent from '../Editor/editor'
import { useArticleEditor } from '../Editor/use-editor'
import { TitileInput } from './title-input'
import { EditNavbar } from './edit-navbar'
import type { Article } from '@/lib/types'

interface EditComponentProps {
  article: Article
}

export function EditComponent({ article }: EditComponentProps) {
  const [title, setTitle] = React.useState(article.title)
  const [content, setContent] = React.useState(article.content)
  const editor = useArticleEditor({
    content: article.content,
    onUpdate: ({ editor: editorInstance }) => {
      setContent(editorInstance.getHTML())
    },
  })

  if (!editor) {
    return null
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <EditNavbar
        articleId={article.id}
        title={title}
        content={content}
        slug={article.slug}
        existingData={{
          title,
          preview_image: article.preview_image,
          preview_text: article.preview_text,
          tags: article.tags,
        }}
      />
      <main className="max-w-3xl mx-auto px-4 pt-12">
        <TitileInput value={title} onChange={setTitle} />
        <div className="relative group/editor-row">
          <EditorComponent editor={editor} />
        </div>
      </main>
    </div>
  )
}
