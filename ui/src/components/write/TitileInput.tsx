import TextareaAutosize from 'react-textarea-autosize'

export function TitileInput() {
  return (
    <div className="group relative mb-8">
      <TextareaAutosize
        placeholder="Title"
        className="w-full resize-none appearance-none overflow-hidden
          bg-transparent text-3xl font-bold focus:outline-none text-foreground
          placeholder:text-muted-foreground/40 leading-tight"
      />
    </div>
  )
}
