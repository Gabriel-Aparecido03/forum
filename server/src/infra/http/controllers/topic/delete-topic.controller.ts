import { DeleteTopicUseCase } from "@/domain/forum/application/use-cases/delete-topic"
import { AuthGuard } from "@/infra/auth/auth.guard"
import { CurrentUser } from "@/infra/auth/current-user"
import { Controller, Delete, UseGuards, HttpCode, Param } from "@nestjs/common"
import { z } from "zod"

const bodySchema = z.object({
  topicId : z.string().uuid()
})

@Controller('/topic/')
export class DeleteTopicController {

  constructor(private deleteTopic : DeleteTopicUseCase) {}

  @Delete('/:topicId')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async handle(@CurrentUser() { user }, @Param() param) {
    const { topicId } = bodySchema.parse(param)
    await this.deleteTopic.execute({
      id : topicId,
      authorId : user
    })
  }
}