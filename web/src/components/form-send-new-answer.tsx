import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { api } from "../lib/axios";
import { useUser } from "../hook/useUser";

export function FormSendNewAnswer({ topicId }: { topicId : string}) {

  const { user }  = useUser()

  const [text, setText] = useState('')
  const [invalidText, setInvalidText] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  function validateFields() {
    setInvalidText(true)
    setErrorMessage('')
    if (text.trim().length === 0) {
      setInvalidText(true)
      setErrorMessage('Please, insert something !')
      return false
    }

    return true
  }

  async function handleSendNewAnswer() {
    if(!validateFields()) return

    try {
      await api.post('/answer',{
        authorId : user!.id,
        content : text,
        topicId : topicId
      })
    } catch (error) {}
  }

  return (
    <div className="w-2/3 rounded-lg p-4 border border-solid border-zinc-300 mt-5">
      <Textarea value={text} onChange={e => setText(e.target.value)} className="flex-1 justify-between" placeholder="Type your comment here !" />
      <div className="flex items-center justify-between mt-3 w-1/3">
        <Button text="Send" fullWidth onClick={handleSendNewAnswer}/>
      </div>
    </div>
  )
}