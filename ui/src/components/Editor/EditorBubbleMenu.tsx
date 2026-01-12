import { BubbleMenu } from '@tiptap/react/menus'
import {
  Link01Icon,
  TextBoldIcon,
  TextItalicIcon,
  TextStrikethroughIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import clsx from 'clsx'
import type { Editor } from '@tiptap/react'

type EditorBubbleMenuProps = {
  editor: Editor
}

export const EditorBubbleMenu = ({ editor }: EditorBubbleMenuProps) => {
  return (
    <BubbleMenu editor={editor} className="bubble-menu">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={clsx('bubble-menu-button', {
          'is-active': editor.isActive('bold'),
        })}
        title="Bold"
      >
        <HugeiconsIcon icon={TextBoldIcon} size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={clsx('bubble-menu-button', {
          'is-active': editor.isActive('italic'),
        })}
        title="Italic"
      >
        <HugeiconsIcon icon={TextItalicIcon} size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={clsx('bubble-menu-button', {
          'is-active': editor.isActive('strike'),
        })}
        title="Strike"
      >
        <HugeiconsIcon icon={TextStrikethroughIcon} size={16} />
      </button>
      <button
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
        className={clsx('bubble-menu-button', {
          'is-active': editor.isActive('link'),
        })}
        title="Link"
      >
        <HugeiconsIcon icon={Link01Icon} size={16} />
      </button>
    </BubbleMenu>
  )
}
