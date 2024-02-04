import { MockInstance } from "vitest"

import { SendNotificationUseCase } from "../use-cases/send-notification"
import { OnAnswerCreated } from "./on-answer-created"
import { waitFor } from "../../../../../test/utils/wait-for"
import { makeAnswer } from "test/factories/make-answer"
import { makeTopic } from "test/factories/make-topic"
import { InMemoryAnswerRepository } from "test/repositories/in-memory-answer-repository"
import { InMemoryNotificationRepository } from "test/repositories/in-memory-notification-repository"
import { InMemoryTopicRepository } from "test/repositories/in-memory-topic-repository"

let inMemoryTopicRepository: InMemoryTopicRepository
let inMemoryAnswersRepository: InMemoryAnswerRepository
let inMemoryNotificationRepository: InMemoryNotificationRepository
let sendNotification: SendNotificationUseCase
let onAnswerCreated: OnAnswerCreated
let spy : MockInstance

describe('On answer created - Unit', () => {
  beforeEach(() => {
    inMemoryTopicRepository = new InMemoryTopicRepository()
    inMemoryNotificationRepository = new InMemoryNotificationRepository()
    inMemoryAnswersRepository = new InMemoryAnswerRepository()
    sendNotification = new SendNotificationUseCase(inMemoryNotificationRepository)
    spy = vi.spyOn(sendNotification,'execute')
    onAnswerCreated = new OnAnswerCreated(inMemoryTopicRepository, sendNotification)
  })

  it('should to send a notification when an answer is created', async () => {
    const topic = makeTopic()
    const answer = makeAnswer({
      topicId : topic.id
    })

    inMemoryTopicRepository.items.push(topic)
    inMemoryAnswersRepository.create(answer)

    await waitFor(() => {
      expect(spy).toHaveBeenCalled()
    })
  })
})