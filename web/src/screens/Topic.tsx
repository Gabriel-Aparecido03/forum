import { useState } from "react";
import { BasePage } from "../components/base-page";
import { Profile } from "../components/profile";
import { Button } from "../components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/axios";
import { useNavigate, useParams } from "react-router-dom";
import { Answers } from "../components/answers";
import { FetchTopics } from "../types/fetch-topics";
import { FormSendNewAnswer } from "../components/form-send-new-answer";
import { Pencil, Check, Trash } from "phosphor-react";
import { useUser } from "../hook/useUser";
import { Textarea } from "../components/ui/textarea";
import { toast, Bounce, ToastContainer } from "react-toastify";

export function Topic() {

  const notify = () => toast.success('Action completed with sucess !', {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });

  const params = useParams()
  const navigate = useNavigate()
  const { user } = useUser()

  const [contentText, setContentText] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [showFormCreateAnswer, setShowFormCreateAnswer] = useState(false)
  const [isInvalidContext, setIsInvalidContent] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')


  const { data, isLoading, refetch } = useQuery({
    queryKey: [`topic-${params.slug}`],
    queryFn: async () =>
      await api.get(`/topic/${params.slug}`)
  })

  const topic = data?.data as FetchTopics

  if (isLoading) return null

  function validFields() {
    if (contentText.trim().length === 0) {
      setIsInvalidContent(true)
      setErrorMessage('Invalid content .')
      return false
    }
    return true
  }

  async function handleDelete() {
    try {
      await api.delete(`/topic/${topic.id}`)
      notify()
      navigate('/home')
    } catch (e) { }
  }
  async function handleSave() {
    setIsEditing(false)
    if (!validFields()) return
    try {
      await api.put(`/topic/${topic.id}`, { content: contentText })
      notify()
      await refetch()
    } catch (e) { }
  }

  return (
    <BasePage>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className="mx-auto w-[900px] mb-5 ">
        <div className="flex mt-10 items-start">
          <div className="flex flex-col w-full">
            <div className="rounded-lg p-4 border border-solid border-zinc-300 flex flex-col justify-start items-start">
              <div className="flex items-center justify-between w-full">
                <Profile author={topic.author} />
                {user!.id === topic.authorId &&
                  <div className="flex items-center gap-3 jutsify-center">
                    {!isEditing &&
                      <Pencil
                        className="h-4 w-4 text-zinc-500 cursor-pointer"
                        onClick={() => {
                          setIsEditing(true)
                          setContentText(topic.content)
                        }}
                      />
                    }
                    {isEditing && <Check className="h-4 w-4 text-green-500 cursor-pointer" onClick={handleSave} />}
                    <Trash className="h-4 w-4 text-red-500 cursor-pointer" onClick={handleDelete} />
                  </div>
                }
              </div>
              <div className="p-2 flex flex-col gap-3 w-full">
                <h1 className="text-zinc-800 text-2xl font-bold">{topic.title}</h1>
                <div className="w-full border-t border-solid border-zinc-200">
                  {isEditing && <Textarea isInvalid={isInvalidContext} value={contentText} onChange={e => setContentText(e.target.value)} />}
                  {!isEditing && <p className="text-sm text-zinc-500 pt-3">{topic.content}</p>}
                  <p className="text-red-400 font-thin text-sm">{errorMessage}</p>
                </div>
              </div>
              <div className="w-1/3 ml-auto">
                <Button text="Create Answer" fullWidth onClick={() => { setShowFormCreateAnswer(!showFormCreateAnswer) }} />
              </div>
            </div>
            {showFormCreateAnswer && <FormSendNewAnswer topicId={topic.id} />}
            <Answers topicId={topic.id} />
          </div>
        </div>
      </div>
    </BasePage>
  )
}