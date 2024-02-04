import { NotAllowedError } from "@/domain/core/errors/not-allowed"
import { makeNotification } from "../../../../../test/factories/make-notification"
import { InMemoryNotificationRepository } from "../../../../../test/repositories/in-memory-notification-repository"
import { ReadNotificationUseCase } from "./read-notification"
import { ResourceNotFoundError } from "@/domain/core/errors/resource-not-found"

describe('Read Notification - Unit', () => {

  let inMemoryNotificationRepository : InMemoryNotificationRepository
  let sut: ReadNotificationUseCase

  beforeEach(() => {
    inMemoryNotificationRepository = new InMemoryNotificationRepository()
    sut = new ReadNotificationUseCase(inMemoryNotificationRepository)
  })

  it('should be to read a notification', async () => {
    const notification = makeNotification()
    inMemoryNotificationRepository.items.push(notification)

    await sut.execute({
      notificationId : notification.id.toString(),
      recipientId : notification.recipientId.toString()
    })

    expect(inMemoryNotificationRepository.items[0].readAt).toBeTruthy()
  })

  it('not should be to read a notification of another recipient', async () => {
    const notification = makeNotification()
    inMemoryNotificationRepository.items.push(notification)

    expect(async () => {
      await sut.execute({
        notificationId : notification.id.toString(),
        recipientId : 'wrong-recipient'
      })
    }).rejects.toBeInstanceOf(NotAllowedError)
  })

  it('not should be to read a notification with dont exists id', async () => {
    const notification = makeNotification()
    inMemoryNotificationRepository.items.push(notification) 

    expect(async () => {
      await sut.execute({
        notificationId : 'wrong-id',
        recipientId : notification.recipientId.toString()
      })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})