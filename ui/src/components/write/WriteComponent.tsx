import Editor from '../Editor/Editor'
import { WriteNavbar } from './WriteNavbar'
import { TitileInput } from './TitileInput'

export function WriteComponent() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <WriteNavbar onPublish={() => console.log('Publish')} />
      <main className="max-w-3xl mx-auto px-4 pt-12">
        <TitileInput />
        <div className="relative group/editor-row">
          <Editor />
        </div>
      </main>
    </div>
  )
}
