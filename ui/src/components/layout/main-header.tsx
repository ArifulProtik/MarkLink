import { Link } from '@tanstack/react-router'
import { HugeiconsIcon } from '@hugeicons/react'
import { PencilEdit02Icon } from '@hugeicons/core-free-icons'
import { GetStartedBtn } from '../home/get-started-btn'
import { AvaterBtn } from '../home/avater-btn'
import type { User } from 'better-auth'

type MainHeaderProps = {
  User: User | null | undefined
}

export function MainHeader({ User }: MainHeaderProps) {
  return (
    <header className="w-full border-b font-normal">
      <div className="container-fluid">
        <div className="flex items-center justify-between w-full py-2 h-16">
          <Link to="/">
            <h1 className="text-2xl font-bold">MarkLink</h1>
          </Link>

          <div
            className="flex items-center gap-4 text-base text-muted-foreground"
          >
            <Link to="/write" className="flex items-center gap-2">
              <HugeiconsIcon size="28" icon={PencilEdit02Icon} /> Write
            </Link>
            {User ? <AvaterBtn User={User} /> : <GetStartedBtn />}
          </div>
        </div>
      </div>
    </header>
  )
}
