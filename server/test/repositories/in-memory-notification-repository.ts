import { Notification } from "../../src/domain/notification/enterprise/entities/notification";
import { NotificationsRepository, PaginationParams } from "../../src/domain/notification/application/repositories/notification-repository";

export class InMemoryNotificationRepository implements NotificationsRepository {

  public items: Notification[] = []

  async findById(id: string): Promise<Notification | null> {
    const notification = this.items.find(item => item.id.toString() === id)
    return notification ?? null
  }

  async create(notification: Notification): Promise<void> {
    this.items.push(notification)
  }

  async save(notification: Notification): Promise<void> {
    const index = this.items.findIndex(item => item.id.equals(notification.id))
    this.items[index] = notification
  }

  async getAllNotificationByRecipientId({ page , receipentId }: PaginationParams): Promise<Notification[]> {
    const notifications = await this.items.filter( x => x.recipientId.toString() === receipentId )
    return notifications
  }

}