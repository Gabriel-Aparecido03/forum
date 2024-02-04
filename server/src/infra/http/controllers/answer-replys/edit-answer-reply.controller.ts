import { EditAnswerReplyUseCase } from "@/domain/forum/application/use-cases/edit-answer-reply"
import { AuthGuard } from "@/infra/auth/auth.guard"
import { CurrentUser } from "@/infra/auth/current-user"
import { Controller, Put, UseGuards, HttpCode, Body, Param } from "@nestjs/common"
import { z } from "zod"

const bodySchema = z.object({
  content: z.string(),
  answerId : z.string()
})

const paramSchema = z.object({
  answerReplyId : z.string().uuid()
})

@Controller('/answer-reply/')
export class EditAnswerReplyController {

  constructor(private editAnswerReply : EditAnswerReplyUseCase) {}

  @Put('/:answerReplyId')
  @UseGuards(AuthGuard)
  @HttpCode(204)
  async handle(@CurrentUser() { user }, @Body() body, @Param() param) {

    const { content ,answerId } = bodySchema.parse(body)
    const { answerReplyId  } = paramSchema.parse(param)

    await this.editAnswerReply.execute({
      answerReplyId : answerReplyId ,
      authorId : user ,
      content,
      answerId
    })
  }
}