import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import { EditorBubbleMenu } from './EditorBubbleMenu'
import { EditorBlockMenu } from './EditorBlockMenu'

function Editor() {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Placeholder.configure({
        placeholder: 'Tell your story...',
        includeChildren: false,
      }),
      Image,
      Link.configure({
        openOnClick: false,
      }),
    ],
    editorProps: {
      attributes: {
        class:
          'prose prose-lg dark:prose-invert max-w-none focus:outline-none min-h-[500px] outline-none',
      },
    },
    content: '',
  })
  const text = editor.getText()
  console.log(text)

  return (
    <>
      <EditorBubbleMenu editor={editor} />
      <EditorBlockMenu editor={editor} />
      <EditorContent value={editor.getHTML()} editor={editor} className="" />
    </>
  )
}
export default Editor
