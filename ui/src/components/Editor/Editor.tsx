import { EditorContent } from '@tiptap/react'
import { EditorBubbleMenu } from './EditorBubbleMenu'
import { EditorBlockMenu } from './EditorBlockMenu'
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
      <EditorContent editor={editor} className="" />
    </>
  )
}
export default Editor
