import { InvalidCredentialsError } from "@/domain/core/errors/invalid-credentials";
import { UserRepostiory } from "../repositories/user-repository";
import { Injectable } from "@nestjs/common";
import { TopicRepository } from "../repositories/topic-repository";
import { ResourceNotFoundError } from "@/domain/core/errors/resource-not-found";
import { AnswerRepository } from "../repositories/answer-repository";
import { Answer } from "../../enterprise/entities/answer";

interface CreateAnswerParams {
  content: string
  authorId: string
  topicId: string
}

@Injectable()
export class CreateAnswerUseCase {
  constructor(
    private topicsRepository: TopicRepository, 
    private usersRepository: UserRepostiory, 
    private answerRepository: AnswerRepository
  ) { }

  async execute({ authorId, content , topicId }: CreateAnswerParams) {
    const user = await this.usersRepository.getById(authorId)
    if (!user) throw new InvalidCredentialsError()

    const topic = await this.topicsRepository.getById(topicId)
    if(!topic) throw new ResourceNotFoundError()

    const answer = Answer.create({
      authorId: user.id,
      content,
      topicId : topic.id
    })

    await this.answerRepository.create(answer)
  }
}