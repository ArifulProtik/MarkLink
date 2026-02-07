import { useCallback, useState } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import { Cancel01Icon } from '@hugeicons/core-free-icons'
import { Badge } from '@ui/components/ui/badge'
import type { KeyboardEvent } from 'react'

type TagInputProps = {
  tags: Array<string>
  onTagsChange: (tags: Array<string>) => void
  maxTags?: number
  placeholder?: string
}

const TAG_INPUT_TRIGGERS = ['Enter', ',', ' ']

export function TagInput({
  tags,
  onTagsChange,
  maxTags = 5,
  placeholder = 'Add a topic...',
}: TagInputProps) {
  const [topicInput, setTopicInput] = useState('')

  const handleRemoveTag = useCallback(
    (tagToRemove: string) => {
      onTagsChange(tags.filter((tag) => tag !== tagToRemove))
    },
    [tags, onTagsChange],
  )

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (TAG_INPUT_TRIGGERS.includes(e.key)) {
        e.preventDefault()
        const newTag = topicInput.trim()
        if (newTag && !tags.includes(newTag) && tags.length < maxTags) {
          onTagsChange([...tags, newTag])
          setTopicInput('')
        }
      } else if (e.key === 'Backspace' && !topicInput && tags.length > 0) {
        e.preventDefault()
        onTagsChange(tags.slice(0, -1))
      }
    },
    [topicInput, tags, onTagsChange, maxTags],
  )

  return (
    <div
      className="flex flex-wrap gap-2 p-2 min-h-10 border border-input
        rounded-md bg-transparent focus-within:ring-1 focus-within:ring-ring"
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
            onClick={() => handleRemoveTag(tag)}
            className="text-muted-foreground hover:text-foreground outline-none"
          >
            <HugeiconsIcon icon={Cancel01Icon} size={14} strokeWidth={2} />
            <span className="sr-only">Remove {tag}</span>
          </button>
        </Badge>
      ))}
      <input
        value={topicInput}
        onChange={(e) => setTopicInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={tags.length === 0 ? placeholder : ''}
        className="flex-1 bg-transparent border-none outline-none text-sm
          min-w-30 placeholder:text-muted-foreground"
      />
    </div>
  )
}
