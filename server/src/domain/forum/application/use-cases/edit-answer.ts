import { InvalidCredentialsError } from "@/domain/core/errors/invalid-credentials";
import { UserRepostiory } from "../repositories/user-repository";
import { Injectable } from "@nestjs/common";
import { ResourceNotFoundError } from "@/domain/core/errors/resource-not-found";
import { AnswerRepository } from "../repositories/answer-repository";

interface EditAnswerParams {
  content: string
  authorId: string
  answerId: string
}

@Injectable()
export class EditAnswerUseCase {
  constructor(
    private usersRepository: UserRepostiory, 
    private answerRepository: AnswerRepository
  ) { }

  async execute({ authorId, content , answerId }: EditAnswerParams) {

    const user = await this.usersRepository.getById(authorId)
    if (!user) throw new InvalidCredentialsError()
    
    const answer = await this.answerRepository.getById(answerId)
    if (!answer) throw new ResourceNotFoundError()

    if(!answer.authorId.equals(user.id)) throw new InvalidCredentialsError()

    answer.content = content
    answer.updatedAt = new Date()

    await this.answerRepository.updated(answer)
  }
}