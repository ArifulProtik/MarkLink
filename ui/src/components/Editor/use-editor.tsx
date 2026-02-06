import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Blockquote from '@tiptap/extension-blockquote'
import { common, createLowlight } from 'lowlight'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Code from '@tiptap/extension-code'
import type { Editor } from '@tiptap/react'

const lowlight = createLowlight(common)

type UseArticleEditorProps = {
  content?: string
  editable?: boolean
  onUpdate?: (params: { editor: Editor }) => void
}

export const useArticleEditor = ({
  content = '',
  editable = true,
  onUpdate,
}: UseArticleEditorProps = {}): Editor => {
  return useEditor({
    editable,
    content,
    onUpdate,
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
  })
}
