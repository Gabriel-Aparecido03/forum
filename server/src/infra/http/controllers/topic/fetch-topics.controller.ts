import { AuthGuard } from "@/infra/auth/auth.guard"
import { Controller, Get, UseGuards, HttpCode, Query } from "@nestjs/common"
import { z } from "zod"
import { FetchTopicsUseCase } from "@/domain/forum/application/use-cases/fetch-topics"
import { TopicWithAuthorPresenter } from "../../presenters/topic-with-autor-presenter"

const querySchema = z.object({
  page: z.coerce.number().default(1),
})

@Controller('/topics') 
export class FetchTopicsController {

  constructor(private fetchTopics: FetchTopicsUseCase) { }

  @Get('')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async handle(@Query() query) {
    const { page } = querySchema.parse(query)
    const { topics } = await this.fetchTopics.execute({ page })
    return topics.map(topic => TopicWithAuthorPresenter.toHTTP(topic))
  }
}