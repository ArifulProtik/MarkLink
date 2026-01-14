import { BubbleMenu } from '@tiptap/react/menus'
import {
  CodeIcon,
  Link01Icon,
  TextBoldIcon,
  TextItalicIcon,
  TextStrikethroughIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useEditorState } from '@tiptap/react'
import type { Editor } from '@tiptap/react'

type EditorBubbleMenuProps = {
  editor: Editor
}

export const EditorBubbleMenu = ({ editor }: EditorBubbleMenuProps) => {
  const { isBold, isItalic, isStrikethrough, isLink, isCode } = useEditorState({
    editor,
    selector: (ctx) => ({
      isBold: ctx.editor.isActive('bold'),
      isItalic: ctx.editor.isActive('italic'),
      isStrikethrough: ctx.editor.isActive('strike'),
      isLink: ctx.editor.isActive('link'),
      isCode: ctx.editor.isActive('code'),
    }),
  })
  return (
    <BubbleMenu editor={editor} className="bubble-menu">
      <button
        className={
          isBold ? 'bubble-menu-button is-active' : 'bubble-menu-button'
        }
        onClick={() => editor.chain().focus().toggleBold().run()}
        title="Bold"
      >
        <HugeiconsIcon icon={TextBoldIcon} size={16} />
      </button>
      <button
        className={
          isItalic ? 'bubble-menu-button is-active' : 'bubble-menu-button'
        }
        onClick={() => editor.chain().focus().toggleItalic().run()}
        title="Italic"
      >
        <HugeiconsIcon icon={TextItalicIcon} size={16} />
      </button>
      <button
        className={
          isStrikethrough
            ? 'bubble-menu-button is-active'
            : 'bubble-menu-button'
        }
        onClick={() => editor.chain().focus().toggleStrike().run()}
        title="Strike"
      >
        <HugeiconsIcon icon={TextStrikethroughIcon} size={16} />
      </button>
      <button
        className={
          isLink ? 'bubble-menu-button is-active' : 'bubble-menu-button'
        }
        onClick={() => {
          const previousUrl = editor.getAttributes('link').href
          const url = window.prompt('URL', previousUrl)
          if (url === null) {
            return
          }
          if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run()
            return
          }
          editor
            .chain()
            .focus()
            .extendMarkRange('link')
            .setLink({ href: url })
            .run()
        }}
        title="Link"
      >
        <HugeiconsIcon icon={Link01Icon} size={16} />
      </button>
      <button
        className={
          isCode ? 'bubble-menu-button is-active' : 'bubble-menu-button'
        }
        onClick={() => editor.chain().focus().toggleCode().run()}
        title="inline code"
      >
        <HugeiconsIcon icon={CodeIcon} size={16} />
      </button>
    </BubbleMenu>
  )
}
