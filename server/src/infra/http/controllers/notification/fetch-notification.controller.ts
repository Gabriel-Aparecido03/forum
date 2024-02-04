import { FetchNotificationUseCase } from "@/domain/notification/application/use-cases/fetch-notifcation"
import { AuthGuard } from "@/infra/auth/auth.guard"
import { CurrentUser } from "@/infra/auth/current-user"
import { Controller, Get, UseGuards, HttpCode, Query, Body } from "@nestjs/common"
import { z } from "zod"
import { NotificationPresenter } from "../../presenters/notification-presenter"

const querySchema = z.object({
  page: z.coerce.number().default(1),
})

@Controller('/notifications/')
export class FetchNotificationController {

  constructor(private fetchNotifications : FetchNotificationUseCase) {}

  @Get()
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async handle(@Query() query, @Body() body,@CurrentUser() { user }) {
    const {  page } = querySchema.parse(query)
    const { notifications } = await this.fetchNotifications.execute({
      page,
      receipentId : user
    })
    
    return notifications.map( i => NotificationPresenter.toHTTP(i))
  }
}