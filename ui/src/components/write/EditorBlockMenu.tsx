import { PlusSignIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { FloatingMenu } from '@tiptap/react/menus'
import type { Editor } from '@tiptap/react'

type EditorBlockMenuProps = {
  editor: Editor
}

export const EditorBlockMenu = ({ editor }: EditorBlockMenuProps) => {
  return (
    <>
      <FloatingMenu
        editor={editor}
        shouldShow={({ state }) => {
          const { selection } = state
          const { $from } = selection
          const isEmpty = $from.parent.content.size === 0
          return isEmpty
        }}
        className="flex items-center -ml-16"
      >
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className="p-1 text-muted-foreground hover:text-foreground
            hover:bg-muted rounded border border-primary"
          title="Add Heading"
        >
          <HugeiconsIcon icon={PlusSignIcon} size={20} />
        </button>
      </FloatingMenu>
    </>
  )
}
