import { EditorContent } from '@tiptap/react'
import { EditorBubbleMenu } from './editor-bubble-menu'
import { EditorBlockMenu } from './editor-block-menu'
import type { Editor as EditorType } from '@tiptap/react'

type EditorProps = {
  editor: EditorType | null
}

function Editor({ editor }: EditorProps) {
  if (!editor) {
    return null
  }

  return (
    <>
      <EditorBubbleMenu editor={editor} />
      <EditorBlockMenu editor={editor} />
      <EditorContent editor={editor} />
    </>
  )
}
export default Editor
