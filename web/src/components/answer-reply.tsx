import { useState } from "react";
import { Profile } from "./profile";
import { dayjs } from "../lib/dayjs";
import { Pencil, Check, Trash } from "phosphor-react";
import { useUser } from "../hook/useUser";
import { Textarea } from "./ui/textarea";
import { api } from "../lib/axios";

interface AnswerReplyPropsType {
  author: string
  content: string
  createdAt: Date
  id: string
  answerId: string
  updatedAt : Date | null
}

export function AnswerReply({ author, content, createdAt, id, answerId , updatedAt }: AnswerReplyPropsType) {

  const { user } = useUser()

  const [contentText, setContentText] = useState(content)
  const [isEditing, setIsEditing] = useState(false)

  async function handleDelete() {
    try {
      await api.delete(`/answer-reply/${id}`)
    } catch (e) { }
  }
  async function handleSave() {
    setIsEditing(false)
    if (contentText !== content) {
      try {
        await api.put(`/answer-reply/${id}`, { content: contentText, answerId })
      } catch (e) { }
    }
  }

  return (
    <div className="flex items-start w-full flex-col">
      <div className="w-full rounded-lg p-4 border border-solid border-zinc-300 flex flex-col justify-start items-start">
        <div className="w-full justify-between items-center flex">
          <Profile author={author} />
          <div className="flex items-center gap-3">
            <span className="font-light text-zinc-400 text-xs">
              {updatedAt ? `${dayjs(updatedAt).fromNow()} (edited)` : dayjs(createdAt).fromNow()}
            </span>
            {user!.id === author &&
              <div className="flex items-center gap-3 jutsify-center">
                {!isEditing && <Pencil className="h-4 w-4 text-zinc-500 cursor-pointer" onClick={() => setIsEditing(true)} />}
                {isEditing && <Check className="h-4 w-4 text-green-500 cursor-pointer" onClick={handleSave} />}
                <Trash className="h-4 w-4 text-red-500 cursor-pointer" onClick={handleDelete} />
              </div>
            }
          </div>
        </div>
        <div className="p-4 flex flex-col gap-3 w-full">
          {isEditing && <Textarea value={contentText} onChange={e => setContentText(e.target.value)} />}
          {!isEditing && <p className="text-sm text-zinc-500 pt-3">{content}</p>}
        </div>
      </div>
    </div>
  )
}