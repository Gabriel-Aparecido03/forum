import { DeleteAnswerUseCase } from "@/domain/forum/application/use-cases/delete-answer"
import { AuthGuard } from "@/infra/auth/auth.guard"
import { CurrentUser } from "@/infra/auth/current-user"
import { Controller, Delete, UseGuards, HttpCode, Param } from "@nestjs/common"
import { z } from "zod"


const paramSchema = z.object({
  answerId : z.string().uuid()
})

@Controller('/answer/')
export class DeleteAnswerController {

  constructor(private deleteAnswer : DeleteAnswerUseCase) {}

  @Delete('/:answerId')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async handle(@CurrentUser() { user }, @Param() param) {
    const { answerId } = paramSchema.parse(param)
    await this.deleteAnswer.execute({
      authorId : user,
      answerId : answerId
    })
  }
}