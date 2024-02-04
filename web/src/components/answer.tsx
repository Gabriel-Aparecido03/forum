import { useState } from "react";
import { Profile } from "./profile";
import { Button } from "./ui/button";
import { AnswersReplies } from "./answers-replies";
import { FormSendNewAnswerReply } from "./form-new-answer-reply";
import { dayjs } from "../lib/dayjs";
import { Textarea } from "./ui/textarea";
import { useUser } from "../hook/useUser";
import { Check, Pencil, Trash } from "phosphor-react";
import { api } from "../lib/axios";

interface AnswerPropsType {
  author: string
  content: string
  createdAt: Date
  id: string
  updatedAt : Date | null
}

export function Answer({ author, content, createdAt, id ,updatedAt }: AnswerPropsType) {

  const { user } = useUser()

  const [showFormAnswerReply, setShowFormAnswerReply] = useState(false)
  const [contentText, setContentText] = useState(content)
  const [isEditing, setIsEditing] = useState(false)

  async function handleDelete() { 
    try {
      await api.delete(`/answer/${id}`)
    } catch(e) {}
  }
  async function handleSave() { 
    setIsEditing(false)
    if(contentText !== content ) {
      try {
        await api.put(`/answer/${id}`,{ content : contentText })
      } catch(e) {}
    }
  }

  return (
    <div className="flex items-start w-full flex-col">
      <div className="w-full rounded-lg p-4 border border-solid border-zinc-300 flex flex-col justify-start items-start">
        <div className="w-full justify-between items-center flex">
          <Profile author={author} />
          <div className="flex items-center gap-3">
            <span className="font-light text-zinc-400 text-xs">
              { updatedAt ? `${dayjs(updatedAt).fromNow()} (edited)` : dayjs(createdAt).fromNow() }
            </span>
            {user!.id === author &&
              <div className="flex items-center gap-3 jutsify-center">
                { !isEditing && <Pencil className="h-4 w-4 text-zinc-500 cursor-pointer" onClick={() => setIsEditing(true)} />}
                { isEditing && <Check className="h-4 w-4 text-green-500 cursor-pointer" onClick={() => handleSave()} />}
                <Trash onClick={handleDelete} className="h-4 w-4 text-red-500 cursor-pointer" />
              </div>
            }
          </div>
        </div>
        <div className="p-4 flex flex-col gap-3 w-full">
          {isEditing && <Textarea  value={contentText} onChange={e => setContentText(e.target.value)} />}
          {!isEditing && <p data-testid="content" className="text-sm text-zinc-500 pt-3">{content}</p>}
        </div>
        <div className="w-full ml-auto flex items-center justify-between mt-6">
          <div className="w-1/3">
            <Button
              text="Create answer reply"
              size="sm"
              variant="primary"
              fullWidth
              onClick={() => setShowFormAnswerReply(!showFormAnswerReply)}
            />
          </div>
        </div>
        {showFormAnswerReply && <FormSendNewAnswerReply answerId={id} />}
      </div>
      <AnswersReplies answerId={id} />
    </div>
  )
}