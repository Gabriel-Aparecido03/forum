import { Injectable } from '@nestjs/common';
import { Notification } from '@/domain/notification/enterprise/entities/notification'

export interface PaginationParams {
  page : number,
  receipentId : string
}

@Injectable()
export abstract class  NotificationsRepository {
  abstract findById(id: string): Promise<Notification | null>
  abstract create(notification: Notification): Promise<void>
  abstract save(notification: Notification): Promise<void>
  abstract getAllNotificationByRecipientId(props : PaginationParams): Promise<Notification[] | null>
}