import { EditAnswerUseCase } from "@/domain/forum/application/use-cases/edit-answer"
import { AuthGuard } from "@/infra/auth/auth.guard"
import { CurrentUser } from "@/infra/auth/current-user"
import { Controller, Put, UseGuards, HttpCode, Body, Param } from "@nestjs/common"
import { z } from "zod"

const bodySchema = z.object({
  content: z.string(),
})

const paramSchema = z.object({
  answerId : z.string().uuid()
})

@Controller('/answer')
export class EditAnswerController {

  constructor(private editAnswer : EditAnswerUseCase) {}

  @Put('/:answerId')
  @UseGuards(AuthGuard)
  @HttpCode(204)
  async handle(@CurrentUser() { user }, @Body() body, @Param() param) {

    const { content } = bodySchema.parse(body)
    const { answerId } = paramSchema.parse(param)

    await this.editAnswer.execute({
      answerId ,
      authorId : user ,
      content
    })
  }
}