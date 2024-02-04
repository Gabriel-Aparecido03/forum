import { GetTopicBySlugUseCase } from "@/domain/forum/application/use-cases/get-topic-by-slug"
import { AuthGuard } from "@/infra/auth/auth.guard"
import { Controller, Get, UseGuards, HttpCode, Param } from "@nestjs/common"
import { z } from "zod"
import { TopicWithAuthorPresenter } from "../../presenters/topic-with-autor-presenter"

const bodySchema = z.object({
  slug : z.string()
})

@Controller('/topic')
export class GetTopicBySlugController {

  constructor(private getTopicBySlug : GetTopicBySlugUseCase) {}

  @Get('/:slug')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async handle(@Param() params) {
    const { slug } = bodySchema.parse(params)
    const { topic } = await this.getTopicBySlug.execute({ slug })
    return TopicWithAuthorPresenter.toHTTP(topic)
  }
}