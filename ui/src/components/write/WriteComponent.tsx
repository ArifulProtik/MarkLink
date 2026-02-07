import * as React from 'react'
import EditorComponent from '../Editor/Editor'
import { useArticleEditor } from '../Editor/use-editor'
import { TitileInput } from './TitileInput'
import { WriteNavbar } from './WriteNavbar'

export function WriteComponent() {
  const [title, setTitle] = React.useState('')
  const [content, setContent] = React.useState('')
  const editor = useArticleEditor({
    onUpdate: ({ editor: editorInstance }) => {
      setContent(editorInstance.getHTML())
    },
  })

  if (!editor) {
    return null
  }

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
