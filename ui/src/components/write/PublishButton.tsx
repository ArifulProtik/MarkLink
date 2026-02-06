import { useCallback, useMemo, useState } from 'react'
import { Button } from '@ui/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@ui/components/ui/dialog'
import { Input } from '@ui/components/ui/input'
import { TagInput } from '@ui/components/shared/TagInput'
import { useUploadImage } from '@ui/hooks/use-upload-image'
import { ImageUpload } from './ImageUpload'

type PublishButtonProps = {
  title: string
  content: string | undefined
}

const MAX_TAGS = 5

function isContentEmpty(content: string | undefined): boolean {
  if (!content) return true
  return content === '' || content === '<p></p>'
}

export function PublishButton({ title, content }: PublishButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [previewTitle, setPreviewTitle] = useState('')
  const [previewText, setPreviewText] = useState('')
  const [tags, setTags] = useState<Array<string>>([])
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null)

  const { mutate: uploadImage, isPending: isUploading } = useUploadImage()

  const handleOpenChange = useCallback(
    (open: boolean) => {
      setIsOpen(open)
      if (open) {
        setPreviewTitle(title)
        setPreviewText('')
        setTags([])
        setPreviewImageUrl(null)
      }
    },
    [title],
  )

  const handleImageUpload = useCallback(
    (file: File) => {
      uploadImage(file, {
        onSuccess: (url) => {
          setPreviewImageUrl(url)
        },
        onError: (error) => {
          console.error('Failed to upload image:', error)
        },
      })
    },
    [uploadImage],
  )

  const isTriggerDisabled = useMemo(
    () => title === '' || isContentEmpty(content),
    [title, content],
  )

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger render={<Button disabled={isTriggerDisabled} size="lg" />}>
        Publish
      </DialogTrigger>
      <DialogContent className="sm:max-w-225 gap-0 p-0 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column - Preview */}
          <div className="p-8 md:p-10 space-y-6">
            <h3 className="font-bold text-lg mb-4">Story Preview</h3>

            <ImageUpload
              previewImage={previewImageUrl}
              isUploading={isUploading}
              onFileSelect={handleImageUpload}
            />

            <div className="space-y-4 pt-2">
              <Input
                value={previewTitle}
                onChange={(e) => setPreviewTitle(e.target.value)}
                placeholder="Title"
                className="text-lg font-bold"
              />
              <Input
                value={previewText}
                onChange={(e) => setPreviewText(e.target.value)}
                placeholder="Write a preview description..."
              />
            </div>

            <p className="text-xs text-muted-foreground pt-2">
              Note: Changes here will affect how your story appears in public
              places like Medium&apos;s homepage and in subscribers&apos;
              inboxes — not the contents of the story itself.
            </p>
          </div>

          {/* Right Column - Publishing Options */}
          <div className="p-8 md:p-10 space-y-6 flex flex-col">
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Publishing to:{' '}
                <span className="font-bold text-foreground">
                  Kakaashihatakee
                </span>
              </p>

              <p className="text-sm pt-2">
                Add or change topics (up to {MAX_TAGS}) so readers know what
                your story is about
              </p>

              <TagInput tags={tags} onTagsChange={setTags} maxTags={MAX_TAGS} />
            </div>

            <div className="flex-1" />

            <div className="flex flex-row items-center gap-4 pt-4">
              <Button>Publish now</Button>
              <Button disabled variant="secondary">
                Save as draft
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
