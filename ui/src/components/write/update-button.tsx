import { useCallback, useMemo, useRef, useState } from 'react'
import { z } from 'zod'
import { Button } from '@ui/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@ui/components/ui/dialog'
import { TagInput } from '@ui/components/shared/tag-input'
import { useUploadImage } from '@ui/hooks/use-upload-image'
import { Textarea } from '@ui/components/ui/textarea'
import { useUpdateArticle } from '@ui/data/queries/article'
import { Link, useRouter } from '@tanstack/react-router'
import { toast } from 'sonner'
import { ImageUpload } from './image-upload'

const MAX_PREVIEW_LENGTH = 150
const MAX_TAGS = 5

type UpdateData = z.infer<typeof updateSchema>

const updateSchema = z.object({
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

interface UpdateButtonProps {
  articleId: string
  title: string
  content: string | undefined
  slug: string
  existingData: {
    title: string
    preview_image: string
    preview_text: string
    tags: Array<string>
  }
}

function isContentEmpty(content: string | undefined): boolean {
  if (!content) return true
  return content === '' || content === '<p></p>'
}

export function UpdateButton({
  articleId,
  title,
  content,
  slug,
  existingData,
}: UpdateButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [previewTitle, setPreviewTitle] = useState(existingData.title)
  const [previewText, setPreviewText] = useState(existingData.preview_text)
  const [tags, setTags] = useState<Array<string>>(existingData.tags)
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(
    existingData.preview_image,
  )
  const [errors, setErrors] = useState<Array<string>>([])
  const previewTextRef = useRef<HTMLTextAreaElement>(null)
  const router = useRouter()

  const { mutate: uploadImage, isPending: isUploading } = useUploadImage()

  const validateForm = useCallback((): UpdateData | null => {
    const result = updateSchema.safeParse({
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
        // Reset to existing data when opening
        setPreviewTitle(existingData.title)
        setPreviewText(existingData.preview_text)
        setTags(existingData.tags)
        setPreviewImageUrl(existingData.preview_image)
        setErrors([])
      }
    },
    [existingData],
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

  const { mutate: updateArticle, isPending: isUpdating } = useUpdateArticle()

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger render={<Button disabled={isTriggerDisabled} size="lg" />}>
        Update
      </DialogTrigger>
      <DialogContent className="sm:max-w-225 gap-0 p-0 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column - Preview */}
          <div className="p-8 md:p-10 space-y-6">
            <h3 className="font-bold text-lg mb-4">Article Preview</h3>

            <ImageUpload
              previewImage={previewImageUrl}
              isUploading={isUploading}
              onFileSelect={handleImageUpload}
            />

            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <label
                  className="text-sm font-medium text-muted-foreground mb-2
                    block"
                >
                  Title
                </label>
                <Textarea
                  value={previewTitle}
                  maxLength={100}
                  onChange={(e) => setPreviewTitle(e.target.value)}
                  placeholder="Enter your article title"
                  rows={1}
                  className="text-lg h-6 resize-none overflow-hidden"
                />
              </div>
              <div className="space-y-2">
                <label
                  className="text-sm font-medium text-muted-foreground mb-2
                    block"
                >
                  Preview Text
                </label>
                <Textarea
                  ref={previewTextRef}
                  value={previewText}
                  maxLength={MAX_PREVIEW_LENGTH}
                  onChange={(e) => setPreviewText(e.target.value)}
                  placeholder="Write a preview description..."
                  className="h-20 resize-none overflow-hidden"
                />
              </div>
            </div>

            <p className="text-xs text-muted-foreground pt-2">
              Note: Changes here will affect how your article appears in public
              places like the Marklink homepage and in subscribers&apos; inboxes
              — not the contents of the article itself.
            </p>
          </div>

          {/* Right Column - Update Options */}
          <div className="p-8 md:p-10 space-y-6 flex flex-col">
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Updating article by:{' '}
                <span className="font-bold text-foreground">You</span>
              </p>

              <p className="text-sm pt-2">
                Add or change topics (up to {MAX_TAGS}) so readers know what
                your article is about
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
                disabled={isUpdating}
                onClick={() => {
                  const formData = validateForm()
                  if (formData) {
                    updateArticle(
                      { id: articleId, data: formData },
                      {
                        onSuccess: () => {
                          router.navigate({ to: `/article/${slug}` })
                        },
                      },
                    )
                  }
                }}
              >
                {isUpdating ? (
                  <div
                    className="size-4 border-2 border-current
                      border-t-transparent rounded-full animate-spin"
                    aria-hidden="true"
                  />
                ) : (
                  'Update now'
                )}
              </Button>
              <Link to="/article/$slug" params={{ slug }}>
                <Button variant="secondary">Cancel</Button>
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
