import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from "../repositories/notification-repository";
import { NotAllowedError } from "@/domain/core/errors/not-allowed";
import { ResourceNotFoundError } from "@/domain/core/errors/resource-not-found";

interface ReadNotificationProps {
  notificationId : string
  recipientId : string
}

@Injectable()
export class ReadNotificationUseCase {
  constructor(private notificationRepository : NotificationsRepository) {}

  async execute({notificationId,recipientId} : ReadNotificationProps) {
    const notification = await this.notificationRepository.findById(notificationId)
    if(!notification) throw new ResourceNotFoundError()

    if(notification.recipientId.toString() !== recipientId) throw new NotAllowedError()

    notification.read()
     
    await this.notificationRepository.save(notification)
  }
}