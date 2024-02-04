import { UniqueEntityID } from "@/domain/core/unique-entity-id";
import { Notification } from "@/domain/notification/enterprise/entities/notification";
import { Notification as NotificationPrisma , Prisma } from "@prisma/client";

export class PrismaNotificationMapper {
  toDomain(raw : NotificationPrisma) {
    return Notification.create({
      content : raw.content,
      recipientId : new UniqueEntityID(raw.user_id),
      title : raw.title,
      readAt : raw.readAt,
      sendAt : raw.createdAt
    }, new UniqueEntityID(raw.id)
    )
  }

  toPrisma(notification : Notification ) : Prisma.NotificationUncheckedCreateInput { 
    return {
      content : notification.content,
      title : notification.title,
      user_id : notification.recipientId.toString(),
      createdAt : notification.sendAt,
      id : notification.id.toString(),
      readAt : notification.readAt,
    }
  }
}