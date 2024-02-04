import { CreateAnswerReplyUseCase } from "@/domain/forum/application/use-cases/create-answer-reply"
import { AuthGuard } from "@/infra/auth/auth.guard"
import { CurrentUser } from "@/infra/auth/current-user"
import { Controller, Post, UseGuards, HttpCode, Body } from "@nestjs/common"
import { z } from "zod"

const bodySchema = z.object({
  content: z.string(),
  answerId: z.string().uuid(),
})

@Controller('/answer-reply/')
export class CreateAnswerReplyController {

  constructor(private createAnswerReply : CreateAnswerReplyUseCase) {}

  @Post()
  @UseGuards(AuthGuard)
  @HttpCode(201)
  async handle(@CurrentUser() { user }, @Body() body) {

    const {  content  ,answerId } = bodySchema.parse(body)
    await this.createAnswerReply.execute({
      authorId : user ,
      content,
      answerId,
    })
  }
}