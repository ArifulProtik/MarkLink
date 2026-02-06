import { useCallback, useRef } from 'react'
import type { ChangeEvent } from 'react'

type ImageUploadProps = {
  previewImage: string | null
  isUploading: boolean
  onFileSelect: (file: File) => void
}

export function ImageUpload({
  previewImage,
  isUploading,
  onFileSelect,
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleClick = useCallback(() => {
    if (!isUploading) {
      fileInputRef.current?.click()
    }
  }, [isUploading])

  const handleFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (file) {
        onFileSelect(file)
      }
    },
    [onFileSelect],
  )

  return (
    <div
      onClick={handleClick}
      className="w-full aspect-video bg-muted flex items-center justify-center
        text-center p-6 cursor-pointer hover:bg-muted/80 transition-colors
        rounded-md overflow-hidden relative"
    >
      {isUploading ? (
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <div
            className="size-6 border-2 border-primary border-t-transparent
              rounded-full animate-spin"
          />
          <p className="text-sm">Uploading...</p>
        </div>
      ) : previewImage ? (
        <img
          src={previewImage}
          alt="Preview"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <p className="text-sm">
            Include a high-quality image in your story to make it more inviting
            to readers.
          </p>
        </div>
      )}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
        disabled={isUploading}
      />
    </div>
  )
}
