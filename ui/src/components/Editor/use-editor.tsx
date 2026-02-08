import { useEffect } from 'react'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import { common, createLowlight } from 'lowlight'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import type { Editor } from '@tiptap/react'

const lowlight = createLowlight(common)

type UseArticleEditorProps = {
  content?: string
  editable?: boolean
  onUpdate?: (params: { editor: Editor }) => void
  ssr?: boolean
}

export const useArticleEditor = ({
  content = '',
  editable = true,
  ssr = false,
  onUpdate,
}: UseArticleEditorProps = {}): Editor | null => {
  const editor = useEditor({
    immediatelyRender: ssr,
    editable: editable,
    content,
    onUpdate,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2],
        },
        blockquote: false,
        code: false,
        codeBlock: false,
      }),
      Placeholder.configure({
        placeholder: 'Write your article...',
        includeChildren: false,
      }),
      Image,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          spellcheck: false,
        },
      }),
      CodeBlockLowlight.configure({
        lowlight,
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

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (editor) {
      editor.setEditable(editable)
    }
  }, [editor, editable])

  return editor
}
