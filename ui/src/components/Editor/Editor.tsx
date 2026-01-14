import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Blockquote from '@tiptap/extension-blockquote'
import { common, createLowlight } from 'lowlight'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Code from '@tiptap/extension-code'
import { EditorBubbleMenu } from './EditorBubbleMenu'
import { EditorBlockMenu } from './EditorBlockMenu'

const lowlight = createLowlight(common)

function Editor() {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2],
        },
      }),
      Placeholder.configure({
        placeholder: 'Tell your story...',
        includeChildren: false,
      }),
      Image,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          spellcheck: false,
        },
      }),
      Blockquote,
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          spellcheck: 'false',
        },
      }),
      Code.configure({
        HTMLAttributes: {
          spellcheck: 'false',
        },
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

  return (
    <>
      <EditorBubbleMenu editor={editor} />
      <EditorBlockMenu editor={editor} />
      <EditorContent value={editor.getHTML()} editor={editor} className="" />
    </>
  )
}
export default Editor
