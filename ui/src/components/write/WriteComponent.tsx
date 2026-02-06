import * as React from 'react'
import EditorComponent from '../Editor/Editor'
import { useArticleEditor } from '../Editor/use-editor'
import { TitileInput } from './TitileInput'
import { WriteNavbar } from './WriteNavbar'
import type { Editor } from '@tiptap/react'

export function WriteComponent() {
  const [title, setTitle] = React.useState('')
  const [content, setContent] = React.useState('')
  const editor: Editor = useArticleEditor({
    onUpdate: ({ editor: editorInstance }) => {
      setContent(editorInstance.getHTML())
    },
  })

  return (
    <div className="min-h-screen bg-background pb-20">
      <WriteNavbar title={title} content={content} />
      <main className="max-w-3xl mx-auto px-4 pt-12">
        <TitileInput value={title} onChange={setTitle} />
        <div className="relative group/editor-row">
          <EditorComponent editor={editor} />
        </div>
      </main>
    </div>
  )
}
