import { AuthGuard } from "@/infra/auth/auth.guard"
import { Controller, Get, UseGuards, HttpCode, Query, Body, Param } from "@nestjs/common"
import { z } from "zod"
import { FetchAnswersUseCase } from "@/domain/forum/application/use-cases/fetch-answer"
import { AnswerWithAuthorPresenter } from "../../presenters/answer-with-author"

const paramSchema = z.object({
  topicId: z.string().uuid()
})

@Controller('/answers/')
export class FetchAnswerController {

  constructor(private fetchAnswers: FetchAnswersUseCase) { }

  @Get('/:topicId')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async handle( @Param() param) {
    const { topicId } = paramSchema.parse(param)
    const { answers } = await this.fetchAnswers.execute({
      topicId
    })

    return answers.map(answer => AnswerWithAuthorPresenter.toHTTP(answer))
  }
}