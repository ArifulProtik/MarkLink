import { useRef, useState } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import { ImageAdd02Icon } from '@hugeicons/core-free-icons'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'
import type { Editor } from '@tiptap/react'

type EditorImageAddProps = {
  editor: Editor
  isOpen: boolean
  onClose: () => void
}

export function EditorImageAdd({
  editor,
  isOpen,
  onClose,
}: EditorImageAddProps) {
  const [url, setUrl] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Keep empty as requested
    const file = e.target.files?.[0]
  }

  const handleAddFromUrl = () => {
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
      onClose()
      setUrl('')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Image</DialogTitle>
        </DialogHeader>

        {/* File Input Box */}
        <div
          className="border-2 border-dashed border-border rounded-lg p-8 flex
            flex-col items-center justify-center gap-2 text-muted-foreground
            hover:bg-muted/50 transition-colors cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <HugeiconsIcon icon={ImageAdd02Icon} size={24} />
          <p className="text-sm">Click to upload image</p>
          <input
            type="file"
            className="hidden"
            ref={fileInputRef}
            onChange={handleUpload}
            accept="image/*"
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="h-px bg-border flex-1" />
          <span className="text-xs text-muted-foreground uppercase">Or</span>
          <div className="h-px bg-border flex-1" />
        </div>

        {/* URL Input */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Paste image URL..."
            className="flex h-9 w-full rounded-md border border-input
              bg-transparent px-3 py-1 text-sm shadow-sm transition-colors
              file:border-0 file:bg-transparent file:text-sm file:font-medium
              placeholder:text-muted-foreground focus-visible:outline-none
              focus-visible:ring-1 focus-visible:ring-ring
              disabled:cursor-not-allowed disabled:opacity-50"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAddFromUrl()
            }}
          />
          <Button onClick={handleAddFromUrl}>Add</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
