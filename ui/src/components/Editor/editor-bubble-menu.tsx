import { BubbleMenu } from '@tiptap/react/menus'
import {
  Cancel01Icon,
  CodeIcon,
  Link01Icon,
  TextBoldIcon,
  TextItalicIcon,
  TextStrikethroughIcon,
  Tick01Icon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useEditorState } from '@tiptap/react'
import { useEffect, useState } from 'react'
import type { Editor } from '@tiptap/react'

type EditorBubbleMenuProps = {
  editor: Editor
}

export const EditorBubbleMenu = ({ editor }: EditorBubbleMenuProps) => {
  const [isLinkOpen, setIsLinkOpen] = useState(false)
  const [url, setUrl] = useState('')

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

  // Update url state when selection changes or link state changes
  useEffect(() => {
    if (isLink) {
      setUrl(editor.getAttributes('link').href || '')
    } else {
      setUrl('')
    }
  }, [isLink, editor])

  const openLinkInput = () => {
    setIsLinkOpen(true)
    const previousUrl = editor.getAttributes('link').href
    setUrl(previousUrl || '')
  }

  const closeLinkInput = () => {
    setIsLinkOpen(false)
    setUrl('')
    editor.commands.focus()
  }

  const setLink = () => {
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
    } else {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run()
    }
    closeLinkInput()
  }

  const handleUnlink = () => {
    editor.chain().focus().extendMarkRange('link').unsetLink().run()
    closeLinkInput()
  }

  return (
    <BubbleMenu
      editor={editor}
      className="bubble-menu flex items-center bg-white border border-gray-200
        shadow-lg rounded-lg overflow-hidden px-1"
    >
      {isLinkOpen ? (
        <div className="flex items-center gap-2 p-1">
          <input
            type="url"
            className="flex-1 bg-transparent text-sm outline-none text-slate-700
              placeholder:text-slate-400 min-w-[200px]"
            placeholder="Paste or type link..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                setLink()
              } else if (e.key === 'Escape') {
                closeLinkInput()
              }
            }}
          />
          <div className="flex items-center gap-1">
            <button
              onClick={setLink}
              className="p-1 hover:bg-slate-100 rounded text-slate-600
                hover:text-green-600 transition-colors"
              title="Apply Link"
            >
              <HugeiconsIcon icon={Tick01Icon} size={16} />
            </button>
            <button
              onClick={handleUnlink}
              className={`p-1 hover:bg-slate-100 rounded text-slate-600
                hover:text-red-500 transition-colors ${!isLink && 'hidden'}`}
              title="Remove Link"
            >
              <HugeiconsIcon
                icon={Link01Icon}
                size={16}
                className="rotate-45"
              />
            </button>
            <button
              onClick={closeLinkInput}
              className="p-1 hover:bg-slate-100 rounded text-slate-600
                transition-colors"
              title="Close"
            >
              <HugeiconsIcon icon={Cancel01Icon} size={16} />
            </button>
          </div>
        </div>
      ) : (
        <>
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
            onClick={openLinkInput}
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
        </>
      )}
    </BubbleMenu>
  )
}
