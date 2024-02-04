import { DeleteAnswerReplyUseCase } from "@/domain/forum/application/use-cases/delete-answer-reply"
import { AuthGuard } from "@/infra/auth/auth.guard"
import { CurrentUser } from "@/infra/auth/current-user"
import { Controller, Delete, UseGuards, HttpCode, Param } from "@nestjs/common"
import { z } from "zod"

const bodySchema = z.object({
  answerReplyId : z.string().uuid()
})

@Controller('/answer-reply/')
export class DeleteAnswerReplyController {

  constructor(private deleteAnswerReply : DeleteAnswerReplyUseCase) {}

  @Delete('/:answerReplyId')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async handle(@CurrentUser() { user }, @Param() param) {
    const { answerReplyId } = bodySchema.parse(param)
    await this.deleteAnswerReply.execute({
      authorId : user,
      answerReplyId : answerReplyId
    })
  }
}