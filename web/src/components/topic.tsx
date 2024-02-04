import { Link } from "react-router-dom";
import { Profile } from "./profile";
import { dayjs } from "../lib/dayjs";

interface TopicsPropsType {
  author: string
  content: string
  createdAt: Date
  updatedAt: Date | null
  slug: string
  id: string
}

export function Topic({ author, content, createdAt, slug, updatedAt }: TopicsPropsType) {

  return (
    <Link to={`/topic/${slug}`} className="w-[900px] flex flex-col gap-4 py-6 items-start justify-center p-3 border border-solid border-zinc-200 rounded-lg hover:border-l-[4px] transition-all">
      <div className="w-full justify-between items-center flex">
        <Profile author={author} />
        <div className="flex items-center gap-3">
          <span className="font-light text-zinc-400 text-xs">
            {updatedAt ? `${dayjs(updatedAt).fromNow()} (edited)` : dayjs(createdAt).fromNow()}
          </span>
        </div>
      </div>
      <p className="text-sm text-zinc-500 pt-3">{content}</p>
    </Link>
  )
}