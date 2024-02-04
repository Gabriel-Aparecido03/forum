import { MockInstance } from "vitest"
import { makeAnswer } from "../../../../../test/factories/make-answer"
import { makeTopic } from "../../../../../test/factories/make-topic"
import { InMemoryAnswerRepository } from "../../../../../test/repositories/in-memory-answer-repository"
import { InMemoryNotificationRepository } from "../../../../../test/repositories/in-memory-notification-repository"
import { SendNotificationUseCase } from "../use-cases/send-notification"
import { waitFor } from "../../../../../test/utils/wait-for"
import { OnAnswerReplyCreated } from "./on-answer-reply-created"
import { InMemoryTopicRepository } from "../../../../../test/repositories/in-memory-topic-repository"
import { makeAnswerReply } from "../../../../../test/factories/make-answer-reply"
import { InMemoryAnswerReplyRepository } from "../../../../../test/repositories/in-memory-answer-reply-repository"

let inMemoryAnswerRepository: InMemoryAnswerRepository
let inMemoryAnswersRepository: InMemoryAnswerRepository
let inMemoryNotificationRepository: InMemoryNotificationRepository
let inMemoryAnswerReplyRepository: InMemoryAnswerReplyRepository
let sendNotification: SendNotificationUseCase
let onAnswerReplyCreated: OnAnswerReplyCreated
let inMemoryTopicRepository: InMemoryTopicRepository
let spy: MockInstance

describe('On answer reply created - Unit', () => {
  beforeEach(() => {
    inMemoryAnswerReplyRepository = new InMemoryAnswerReplyRepository()
    inMemoryTopicRepository = new InMemoryTopicRepository()
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    inMemoryNotificationRepository = new InMemoryNotificationRepository()
    inMemoryAnswersRepository = new InMemoryAnswerRepository()
    sendNotification = new SendNotificationUseCase(inMemoryNotificationRepository)
    onAnswerReplyCreated = new OnAnswerReplyCreated(inMemoryAnswerRepository, sendNotification)
    spy = vi.spyOn(sendNotification, 'execute')
  })

  it('should to send a notification when an answer is created', async () => {
    const topic = makeTopic()

    const answer = makeAnswer({
      topicId: topic.id
    })

    const answerReply = makeAnswerReply({
      answerId: answer.id
    })

    inMemoryTopicRepository.items.push(topic)
    inMemoryAnswerRepository.items.push(answer)
    inMemoryAnswersRepository.create(answer)
    inMemoryAnswerReplyRepository.create(answerReply)

    await waitFor(() => {
      expect(spy).toHaveBeenCalled()
    })
  })
})