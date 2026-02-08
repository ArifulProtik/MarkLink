import { Link } from '@tanstack/react-router'
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

          <div className="flex items-center gap-4">
            <Link to="/">Our Article</Link>
            <Link to="/write"> Write</Link>

            {User ? <AvaterBtn User={User} /> : <GetStartedBtn />}
          </div>
        </div>
      </div>
    </header>
  )
}
