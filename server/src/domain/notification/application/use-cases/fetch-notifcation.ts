import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from "../repositories/notification-repository";

interface ReadNotificationProps {
  receipentId : string
  page : number
}

@Injectable()
export class FetchNotificationUseCase {
  constructor(private notificationRepository : NotificationsRepository) {}

  async execute({receipentId,page} : ReadNotificationProps) {
    const notifications = await this.notificationRepository.getAllNotificationByRecipientId({ page , receipentId })
    return { notifications }
  }
}