import { useQuery } from "@tanstack/react-query";
import { BasePage } from "../components/base-page";
import { Topic } from "../components/topic";
import { Pagination } from "../components/ui/pagination";
import { api } from "../lib/axios";
import { FetchTopics } from "../types/fetch-topics";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { TextInput } from "../components/ui/text-input";
import { Textarea } from "../components/ui/textarea";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { TopicAtHomeShimmer } from "../components/shimmers/topic-at-home-shimmer";

export function Home() {

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [formCreateTopic, setFormCreateTopic] = useState(false)

  const [isInvalidTitle, setIsInvalidTitle] = useState(false)
  const [isInvalidContent, setIsInvalidContent] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const [page, setPage] = useState(1)


  const notify = () => toast.success('Topic create with sucess', {
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

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['topics'],
    queryFn: async () =>
      await api.get(`/topics?page=${page}`)
  })

  function validFields() {
    setErrorMessage('')
    setIsInvalidTitle(false)
    setIsInvalidContent(false)
    if (title.trim().length === 0) {
      setIsInvalidTitle(true)
      setErrorMessage('Invalid title')
      return false
    }

    if (content.trim().length === 0) {
      setIsInvalidContent(true)
      setErrorMessage('Invalid content')
      return false
    }

    return true
  }

  async function handleCreateTopic() {
    if (!validFields()) return
    try {
      await api.post('/topic', {
        title,
        content
      })
      notify()
      await refetch()
      setFormCreateTopic(false)
      setContent('')
      setTitle('')

    } catch (error) { }
  }

  const topics = data?.data as FetchTopics[]

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
      <div className="w-2/3 mx-auto max-w-[1000px] flex flex-col gap-3 mt-3">
        <div>
          <Button text={!formCreateTopic ? "Create topic" : "Hide"} onClick={() => { setFormCreateTopic(!formCreateTopic) }} />
        </div>
        {
          formCreateTopic &&
          <div className="flex flex-col gap-4 border border-solid border-zinc-200 p-4">
            <TextInput
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Title"
              isInvalid={isInvalidTitle}
            />
            <Textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Content"
              isInvalid={isInvalidContent}
            />
            <div className="w-1/3">
              <Button text="create" fullWidth onClick={handleCreateTopic} />
            </div>
            <span className="font-light text-sm text-red-500">{errorMessage}</span>
          </div>
        }
        <div className="flex flex-col gap-3">
          { !isLoading && 
            topics.length > 0 && topics.map(topic =>
              <Topic
                author={topic.author}
                content={topic.content}
                createdAt={topic.createdAt}
                slug={topic.slug}
                key={topic.id}
                id={topic.id}
                updatedAt={topic.updatedAt}
              />
            )
          }
          { isLoading && <>
            <TopicAtHomeShimmer />
            <TopicAtHomeShimmer />
            <TopicAtHomeShimmer />
            <TopicAtHomeShimmer />
            <TopicAtHomeShimmer />
            <TopicAtHomeShimmer />
          </>}
        </div>
        { !isLoading && <Pagination
          showNext={topics.length === 20}
          showPrev={page !== 1}
          onNext={() => setPage(page + 1)}
          onPrev={() => setPage(page - 1)}
        />}
      </div>
    </BasePage>
  )
}