import { EditTopicUseCase } from "@/domain/forum/application/use-cases/edit-topic"
import { AuthGuard } from "@/infra/auth/auth.guard"
import { CurrentUser } from "@/infra/auth/current-user"
import { Controller, Put, UseGuards, HttpCode, Body, Param } from "@nestjs/common"
import { z } from "zod"

const bodySchema = z.object({
  content: z.string(),
})

@Controller('/topic')
export class EditTopicController {
 
  constructor(private editTopic : EditTopicUseCase) {}

  @Put('/:topicId')
  @UseGuards(AuthGuard)
  @HttpCode(204)
  async handle(@CurrentUser() { user }, @Body() body, @Param() param) {

    const { content } = bodySchema.parse(body)
    await this.editTopic.execute({
      authorId : user,
      content,
      topicId : param.topicId
    })
  }
}