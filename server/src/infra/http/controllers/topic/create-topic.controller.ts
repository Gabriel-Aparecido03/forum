import { CreateTopicUseCase } from "@/domain/forum/application/use-cases/create-topic"
import { AuthGuard } from "@/infra/auth/auth.guard"
import { CurrentUser } from "@/infra/auth/current-user"
import { Controller, Post, UseGuards, HttpCode, Body } from "@nestjs/common"
import { z } from "zod"

const bodySchema = z.object({
  content: z.string(),
  title: z.string()
})

@Controller('/topic/')
export class CreateTopicController {

  constructor(private createTopic : CreateTopicUseCase) {}

  @Post()
  @UseGuards(AuthGuard)
  @HttpCode(201)
  async handle(@CurrentUser() { user }, @Body() body) {

    const { content, title } = bodySchema.parse(body)
    await this.createTopic.execute({
      authorId : user,
      content,
      title
    })
  }
}