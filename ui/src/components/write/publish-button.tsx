import { useCallback, useMemo, useRef, useState } from 'react'
import { z } from 'zod'
import { Button } from '@ui/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@ui/components/ui/dialog'
import { Input } from '@ui/components/ui/input'
import { TagInput } from '@ui/components/shared/tag-input'

import { useUploadImage } from '@ui/hooks/use-upload-image'

import { Textarea } from '@ui/components/ui/textarea'

import { useMutation } from '@tanstack/react-query'

import { api } from '@ui/lib/api'

import { useRouter } from '@tanstack/react-router'

import { toast } from 'sonner'

import { ImageUpload } from './image-upload'

const MAX_PREVIEW_LENGTH = 150
const MAX_TAGS = 5

type PublishData = z.infer<typeof publishSchema>

const publishSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  preview_image: z.preprocess(
    (val) => (val === null ? '' : val),
    z.string().min(1, 'Preview image is required'),
  ),
  preview_text: z
    .string()
    .min(1, 'Preview text is required')
    .max(
      MAX_PREVIEW_LENGTH,
      `Preview text must be ${MAX_PREVIEW_LENGTH} characters or less`,
    ),
  content: z.string().min(1, 'Content is required'),
  tags: z
    .array(z.string().min(3, 'Tag must be at least 3 characters'))
    .min(1, 'At least one tag is required')
    .max(MAX_TAGS, `No more than ${MAX_TAGS} tags allowed`),
})

type PublishButtonProps = {
  title: string
  content: string | undefined
}

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
  const [errors, setErrors] = useState<Array<string>>([])
  const previewTextRef = useRef<HTMLTextAreaElement>(null)
  const router = useRouter()

  const { mutate: uploadImage, isPending: isUploading } = useUploadImage()

  const validateForm = useCallback((): PublishData | null => {
    const result = publishSchema.safeParse({
      title: previewTitle,
      preview_image: previewImageUrl,
      preview_text: previewText,
      content: content || '',
      tags: tags,
    })

    if (!result.success) {
      setErrors(result.error.issues.map((issue) => issue.message))
      return null
    }

    setErrors([])
    return result.data
  }, [previewTitle, previewImageUrl, previewText, content, tags])

  const handleOpenChange = useCallback(
    (open: boolean) => {
      setIsOpen(open)
      if (open) {
        setPreviewTitle(title)
        setPreviewText('')
        setTags([])
        setPreviewImageUrl(null)
        setErrors([])
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
        onError: () => {
          toast.error('Failed to upload image')
        },
      })
    },
    [uploadImage],
  )

  const isTriggerDisabled = useMemo(
    () => title === '' || isContentEmpty(content),
    [title, content],
  )

  const { mutate: publishStory, isPending: isPublishing } = useMutation({
    mutationFn: async (data: PublishData) => {
      const { data: res, error } = await api.api.v1.article.post(data)
      if (error) throw error
      return res
    },
    onError: () => {
      toast.error('Failed to publish story')
    },
    onSuccess: (mydata) => {
      router.navigate({ to: `/article/${mydata.slug}` })
    },
  })

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
              <Textarea
                ref={previewTextRef}
                value={previewText}
                maxLength={MAX_PREVIEW_LENGTH}
                onChange={(e) => setPreviewText(e.target.value)}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement
                  target.style.height = 'auto'
                  target.style.height = `${Math.min(target.scrollHeight, 72)}px`
                }}
                placeholder="Write a preview description..."
                rows={1}
                className="min-h-9 max-h-18 resize-none overflow-hidden"
              />
            </div>

            <p className="text-xs text-muted-foreground pt-2">
              Note: Changes here will affect how your story appears in public
              places like the Marklink homepage and in subscribers&apos; inboxes
              — not the contents of the story itself.
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

            {errors.length > 0 && (
              <div className="text-destructive text-xs space-y-1">
                {errors.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}

            <div className="flex flex-row items-center gap-4 pt-4">
              <Button
                disabled={isPublishing}
                onClick={() => {
                  const formData = validateForm()
                  if (formData) {
                    publishStory(formData)
                  }
                }}
              >
                {isPublishing ? (
                  <div
                    className="size-4 border-2 border-current
                      border-t-transparent rounded-full animate-spin"
                    aria-hidden="true"
                  />
                ) : (
                  'Publish now'
                )}
              </Button>
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
