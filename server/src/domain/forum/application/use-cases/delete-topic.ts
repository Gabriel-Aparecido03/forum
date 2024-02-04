import { InvalidCredentialsError } from "@/domain/core/errors/invalid-credentials";
import { UserRepostiory } from "../repositories/user-repository";
import { Injectable } from "@nestjs/common";
import { TopicRepository } from "../repositories/topic-repository";
import { ResourceNotFoundError } from "@/domain/core/errors/resource-not-found";

interface DeleteTopicParams {
  authorId: string
  id: string
}

@Injectable()
export class DeleteTopicUseCase {
  constructor(private topicsRepository: TopicRepository, private usersRepository: UserRepostiory) { }

  async execute({ authorId, id }: DeleteTopicParams) {
    const user = await this.usersRepository.getById(authorId)
    if (!user) throw new InvalidCredentialsError()

    const topic = await this.topicsRepository.getById(id)
    if(!topic) throw new ResourceNotFoundError()

    if(!user.id.equals(topic.authorId)) throw new InvalidCredentialsError()

    await this.topicsRepository.delete(id)
  }
}