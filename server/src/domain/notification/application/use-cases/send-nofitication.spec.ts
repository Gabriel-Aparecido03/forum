import { InMemoryNotificationRepository } from "../../../../../test/repositories/in-memory-notification-repository"
import { SendNotificationUseCase } from "./send-notification"

describe('Create Notification - Unit', () => {

  let inMemoryNotificationRepository : InMemoryNotificationRepository
  let sut: SendNotificationUseCase

  beforeEach(() => {
    inMemoryNotificationRepository = new InMemoryNotificationRepository()
    sut = new SendNotificationUseCase(inMemoryNotificationRepository)
  })

  it('should be to create a notification', async () => {
    
    const notification = await sut.execute({
      content : 'lorem-content',
      recipientd : '01',
      title : 'lorem-title'
    })

    expect(inMemoryNotificationRepository.items).toHaveLength(1)
    expect(inMemoryNotificationRepository.items[0].content).toEqual('lorem-content')
  })


})