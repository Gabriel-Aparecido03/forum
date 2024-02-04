import { useQuery } from "@tanstack/react-query"
import { api } from "../lib/axios"
import { FetchAnswerReply } from "../types/fetch-answer-reply"
import { AnswerReply } from "./answer-reply"

interface AnswersReplies {
  answerId: string
}

export function AnswersReplies({ answerId }: AnswersReplies) {

  const { data, isLoading } = useQuery({
    queryKey: [`answers-${answerId}`],
    queryFn: async () =>
      await api.get(`/answers-reply/${answerId}`)
  })

  if (isLoading) return null
  const answersRepleis = data?.data as FetchAnswerReply[]

  if (answersRepleis.length === 0) return null
  return (
    <div className="w-11/12 ml-auto mt-4">
      <h4 className="text-zinc-500 text-sm font-bold">Answers replies</h4>
      <div className="flex flex-col gap-2 mt-3">
        {answersRepleis.map(i =>
          <AnswerReply
            author={i.author}
            content={i.content}
            createdAt={i.createdAt}
            id={i.id}
            key={i.id}
            answerId={answerId}
            updatedAt={i.updatedAt}
          />
        )}
      </div>
    </div>
  )
}