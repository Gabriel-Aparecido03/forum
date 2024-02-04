import { ReadNotificationUseCase } from "@/domain/notification/application/use-cases/read-notification"
import { AuthGuard } from "@/infra/auth/auth.guard"
import { CurrentUser } from "@/infra/auth/current-user"
import { Controller, Get, UseGuards, HttpCode, Param, Patch } from "@nestjs/common"
import { z } from "zod"

const paramSchema = z.object({
  notificationId: z.string().uuid()
})

@Controller('/notifications/:notificationId')
export class ReadNotificationController {

  constructor(private readNotification: ReadNotificationUseCase) { }

  @Patch()
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async handle(@CurrentUser() { user }, @Param() param) {
    const { notificationId } = paramSchema.parse(param)
    await this.readNotification.execute({
      notificationId,
      recipientId: user
    })

  }
}