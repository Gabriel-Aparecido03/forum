import { Injectable } from "@nestjs/common";
import { TopicRepository } from "../repositories/topic-repository";
import { Slug } from "../../enterprise/entities/value-objects/Slug";

interface GetTopicBySlug {
  slug: string
}

@Injectable()
export class GetTopicBySlugUseCase {
  constructor(private topicsRepository: TopicRepository) { }

  async execute({ slug }: GetTopicBySlug) {
    const slugText = Slug.createFromText(slug)

    const topic = await this.topicsRepository.getBySlug(slugText)

    return { topic }
  }
}