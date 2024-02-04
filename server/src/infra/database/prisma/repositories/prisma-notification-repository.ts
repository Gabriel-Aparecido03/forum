import { NotificationsRepository ,PaginationParams} from "@/domain/notification/application/repositories/notification-repository";
import { Injectable } from "@nestjs/common";
import { PrismaNotificationMapper } from "../mapper/prisma-notification-mapper";
import { PrismaService } from "../prisma.service";
import { Notification } from "@/domain/notification/enterprise/entities/notification";


@Injectable()
export class PrismaNotification implements NotificationsRepository {

  constructor(private prismaService: PrismaService) { }


  async findById(id: string): Promise<Notification> {
    const result = await this.prismaService.notification.findUnique({
      where: {
        id
      }
    })

    return new PrismaNotificationMapper().toDomain(result)
  }

  async create(notification: Notification): Promise<void> {
    const data = new PrismaNotificationMapper().toPrisma(notification)

    await this.prismaService.notification.create({
      data
    })
  }

  async save(notification: Notification): Promise<void> {
    const data = new PrismaNotificationMapper().toPrisma(notification)

    await this.prismaService.notification.update({
      where: {
        id: data.id
      },
      data
    })
  }

  async getAllNotificationByRecipientId(props: PaginationParams): Promise<Notification[]> {
    const result = await this.prismaService.notification.findMany({
      where: {
        user_id: props.receipentId
      },
      take: 20,
      skip: (props.page - 1)
    })

    return result.map(i => new PrismaNotificationMapper().toDomain(i))
  }
}