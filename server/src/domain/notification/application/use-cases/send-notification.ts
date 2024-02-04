import { Injectable } from "@nestjs/common";
import { UniqueEntityID } from "@/domain/core/unique-entity-id";
import { NotificationsRepository } from "../repositories/notification-repository";
import { Notification } from "../../enterprise/entities/notification";

interface SendNotificationProps {
  recipientd: string
  content: string
  title : string
}

@Injectable()
export class SendNotificationUseCase {
  constructor(private notificationRepository: NotificationsRepository) { }

  async execute({ content , recipientd , title}: SendNotificationProps) {
    const notification = Notification.create({
      recipientId: new UniqueEntityID(recipientd),
      content,
      title
    })
    await this.notificationRepository.create(notification)

    return notification
  }

}