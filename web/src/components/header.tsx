import { Chat } from "phosphor-react";
import { Button } from "./ui/button";
import { Notifications } from "./notifications";
import { Link } from "react-router-dom";
import { useUser } from "../hook/useUser";

export function Header() {

  const { makeLogout } = useUser()

  return (
    <header className="flex border-b border-zinc-200 justify-between border-solid w-full p-4 px-6">
      <Link className="flex items-center gap-1" to='/home'>
        <Chat size={32} className="text-zinc-800" />
        <span className="text-zinc-800 text-sm">Communities.</span>
      </Link>
      <div className="items-center gap-3 flex">
        <Notifications />
        <Button onClick={makeLogout} text="Logout" variant="text" size="sm" />
      </div>
    </header>
  )
}