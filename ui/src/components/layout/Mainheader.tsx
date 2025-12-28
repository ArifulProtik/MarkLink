import { Link } from "@tanstack/react-router";
import { GetStartedBtn } from "../home/GetStartedBtn";

export function MainHeader() {

  return (
    <header className="w-full border-b text-center">
      <div className="container mx-auto">
        <div className="flex items-center justify-between w-full py-2">
          <Link to="/">
            <h1 className="text-2xl font-bold font-mono">MarkLink</h1>
          </Link>
          <GetStartedBtn />
        </div>
      </div>
    </header>
  )
}
