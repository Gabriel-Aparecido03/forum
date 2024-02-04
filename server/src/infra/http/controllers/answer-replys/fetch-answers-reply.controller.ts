import { AuthGuard } from "@/infra/auth/auth.guard"
import { Controller, Get, UseGuards, HttpCode, Query, Body, Param } from "@nestjs/common"
import { z } from "zod"
import { FetchAnswerReplysUseCase } from "@/domain/forum/application/use-cases/fetch-answer-reply"
import { AnswerReplyWithAuthorPresenter } from "../../presenters/answer-reply-with-author"

const paramSchema = z.object({
  answerId: z.string().uuid()
})

@Controller('/answers-reply')
export class FetchAnswerReplyController {

  constructor(private fetchAnswerReply: FetchAnswerReplysUseCase) { }

  @Get('/:answerId')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async handle(@Param() param) {
    const { answerId } = paramSchema.parse(param)
    const { answersReply } = await this.fetchAnswerReply.execute({
      answerId,
    })
    return answersReply.map(answer => AnswerReplyWithAuthorPresenter.toHTTP(answer))
  }
}