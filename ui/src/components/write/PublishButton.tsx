import { useEffect, useRef, useState } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import { Cancel01Icon } from '@hugeicons/core-free-icons'
import { Button } from '@ui/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@ui/components/ui/dialog'
import { Input } from '@ui/components/ui/input'
import { Badge } from '@ui/components/ui/badge'
import type { ChangeEvent, KeyboardEvent } from 'react'

type PublishButtonProps = {
  onClick?: () => void
  title: string
}

export function PublishButton({ onClick, title }: PublishButtonProps) {
  const [previewTitle, setPreviewTitle] = useState(title)
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState<Array<string>>([])
  const [topicInput, setTopicInput] = useState('')
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setPreviewTitle(title)
  }, [title])

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setPreviewImage(imageUrl)
    }
  }

  const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',' || e.key === ' ') {
      e.preventDefault()
      const newTag = topicInput.trim()
      if (newTag && !tags.includes(newTag) && tags.length < 5) {
        setTags([...tags, newTag])
        setTopicInput('')
      }
    } else if (e.key === 'Backspace' && !topicInput && tags.length > 0) {
      e.preventDefault()
      setTags(tags.slice(0, -1))
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button size="lg">Publish</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px] gap-0 p-0 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column */}
          <div className="p-8 md:p-10 space-y-6">
            <h3 className="font-bold text-lg mb-4">Story Preview</h3>

            {/* Image Picker Placeholder */}
            <div
              onClick={handleImageClick}
              className="w-full aspect-video bg-muted flex items-center
                justify-center text-center p-6 cursor-pointer hover:bg-muted/80
                transition-colors rounded-md overflow-hidden relative"
            >
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <p className="text-muted-foreground text-sm">
                  Include a high-quality image in your story to make it more
                  inviting to readers.
                </p>
              )}
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>

            <div className="space-y-4 pt-2">
              <Input
                value={previewTitle}
                onChange={(e) => setPreviewTitle(e.target.value)}
                placeholder="Title"
                className="text-lg font-bold"
              />
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write a preview description..."
              />
            </div>

            <p className="text-xs text-muted-foreground pt-2">
              Note: Changes here will affect how your story appears in public
              places like Medium’s homepage and in subscribers’ inboxes — not
              the contents of the story itself.
            </p>
          </div>

          {/* Right Column */}
          <div className="p-8 md:p-10 space-y-6 flex flex-col">
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Publishing to:{' '}
                <span className="font-bold text-foreground">
                  Kakaashihatakee
                </span>
              </p>

              <p className="text-sm pt-2">
                Add or change topics (up to 5) so readers know what your story
                is about
              </p>

              <div
                className="flex flex-wrap gap-2 p-2 min-h-10 border border-input
                  rounded-md bg-transparent focus-within:ring-1
                  focus-within:ring-ring"
              >
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="gap-1 rounded-md px-2 py-1 text-sm font-normal"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="text-muted-foreground hover:text-foreground
                        outline-none"
                    >
                      <HugeiconsIcon
                        icon={Cancel01Icon}
                        size={14}
                        strokeWidth={2}
                      />
                      <span className="sr-only">Remove {tag}</span>
                    </button>
                  </Badge>
                ))}
                <input
                  value={topicInput}
                  onChange={(e) => setTopicInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  placeholder={tags.length === 0 ? 'Add a topic...' : ''}
                  className="flex-1 bg-transparent border-none outline-none
                    text-sm min-w-[120px] placeholder:text-muted-foreground"
                />
              </div>
            </div>

            <div className="flex-1" />

            <div className="flex flex-row items-center gap-4 pt-4">
              <Button onClick={onClick}>Publish now</Button>
              <Button variant="secondary">Save as draft</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
