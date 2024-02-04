import { InvalidCredentialsError } from "@/domain/core/errors/invalid-credentials";
import { UserRepostiory } from "../repositories/user-repository";
import { Injectable } from "@nestjs/common";
import { TopicRepository } from "../repositories/topic-repository";
import { ResourceNotFoundError } from "@/domain/core/errors/resource-not-found";

interface EditTopicParams {
  content: string
  authorId: string
  topicId: string
}

@Injectable()
export class EditTopicUseCase {
  constructor(private topicsRepository: TopicRepository, private usersRepository: UserRepostiory) { }

  async execute({ authorId, content , topicId }: EditTopicParams) {
    const user = await this.usersRepository.getById(authorId)
    if (!user) throw new InvalidCredentialsError()

    const topic = await this.topicsRepository.getById(topicId)
    if(!topic) throw new ResourceNotFoundError()

    if(!topic.authorId.equals(user.id)) throw new InvalidCredentialsError()

    topic.content = content

    await this.topicsRepository.updated(topic)
  }
}