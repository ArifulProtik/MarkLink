import * as React from 'react'
import Editor from '../Editor/Editor'
import { WriteNavbar } from './WriteNavbar'
import { TitileInput } from './TitileInput'

export function WriteComponent() {
  const [title, setTitle] = React.useState('')

  return (
    <div className="min-h-screen bg-background pb-20">
      <WriteNavbar onPublish={() => console.log('Publish')} title={title} />
      <main className="max-w-3xl mx-auto px-4 pt-12">
        <TitileInput value={title} onChange={setTitle} />
        <div className="relative group/editor-row">
          <Editor />
        </div>
      </main>
    </div>
  )
}
