import { useQuery } from "@tanstack/react-query"
import { api } from "../lib/axios"
import { Answer } from "./answer"
import { FetchAnswer } from "../types/fetch-answer"
import { AnswerAtTopicShimmer } from "./shimmers/answer-at-topic-shimmer"

interface AnswersPropsType {
  topicId: string
}

export function Answers({ topicId }: AnswersPropsType) {

  const { data, isLoading } = useQuery({
    queryKey: [`answers-${topicId}`],
    queryFn: async () =>
      await api.get(`/answers/${topicId}`)
  })

  const answers = data?.data as FetchAnswer[]
  return (
    <div className="w-full b">
      {!isLoading && answers.length > 0 && <>
        <h2 className="text-zinc-600 text-xl my-10">Answers</h2>
        <div className="w-full">
          {
            answers.map(i =>
              <Answer
                author={i.author}
                content={i.content}
                createdAt={i.createdAt}
                id={i.id}
                key={i.id}
                updatedAt={i.updatedAt}
              />
            )
          }
        </div>
      </>
      }
      {isLoading && <>
        <AnswerAtTopicShimmer />
        <AnswerAtTopicShimmer />
        <AnswerAtTopicShimmer />
        <AnswerAtTopicShimmer />
        <AnswerAtTopicShimmer />
        <AnswerAtTopicShimmer />
        <AnswerAtTopicShimmer />
      </>
      }
      {answers?.length === 0 && <span className="font-light text-zinc-600 text-lg w-full text-center">Theres no answers for this topic.</span>}
    </div>
  )
}