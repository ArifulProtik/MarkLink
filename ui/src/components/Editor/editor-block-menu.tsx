import {
  HeadingIcon,
  ImageAdd02Icon,
  LeftToRightListBulletIcon,
  LeftToRightListNumberIcon,
  PlusSignIcon,
  QuoteUpIcon,
  SourceCodeIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { FloatingMenu } from '@tiptap/react/menus'
import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { EditorImageAdd } from './editor-image-add'
import type { Editor } from '@tiptap/react'

type EditorBlockMenuProps = {
  editor: Editor
}

export const EditorBlockMenu = ({ editor }: EditorBlockMenuProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
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
        <EditorImageAdd
          editor={editor}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
        <DropdownMenu>
          <DropdownMenuTrigger className="border border-foreground p-0.5">
            <HugeiconsIcon icon={PlusSignIcon} size={20} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
            >
              <HugeiconsIcon icon={HeadingIcon} />
              Heading
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
            >
              <HugeiconsIcon icon={QuoteUpIcon} />
              Quote
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => editor.chain().focus().toggleBulletList().run()}
            >
              <HugeiconsIcon icon={LeftToRightListBulletIcon} />
              List
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
            >
              <HugeiconsIcon icon={LeftToRightListNumberIcon} />
              Numbered List
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            >
              <HugeiconsIcon icon={SourceCodeIcon} />
              Code
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsOpen(true)}>
              <HugeiconsIcon icon={ImageAdd02Icon} />
              Image
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </FloatingMenu>
    </>
  )
}
