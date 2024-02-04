import { CreateAnswerUseCase } from "@/domain/forum/application/use-cases/create-answer";
import { AuthGuard } from "@/infra/auth/auth.guard";
import { CurrentUser } from "@/infra/auth/current-user";
import { Body, Controller, HttpCode, Post, UseGuards } from "@nestjs/common";
import { z } from "zod";


const bodySchema = z.object({
  content: z.string(),
  topicId: z.string().uuid(),
})

@Controller('/answer/')
export class CreateAnswerController {

  constructor(private createAnswer: CreateAnswerUseCase) { }

  @Post()
  @UseGuards(AuthGuard)
  @HttpCode(201)
  async handle(@CurrentUser() { user }, @Body() body) {

    const { content, topicId } = bodySchema.parse(body)

    await this.createAnswer.execute({
      authorId: user,
      content,
      topicId,
    })
  }
}