import TextareaAutosize from 'react-textarea-autosize'

type TitileInputProps = {
  value: string
  onChange: (value: string) => void
}

export function TitileInput({ value, onChange }: TitileInputProps) {
  return (
    <div className="group relative mb-8">
      <TextareaAutosize
        placeholder="Title"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full resize-none appearance-none overflow-hidden
          bg-transparent text-3xl font-bold focus:outline-none text-foreground
          placeholder:text-muted-foreground/40 leading-tight"
      />
    </div>
  )
}
