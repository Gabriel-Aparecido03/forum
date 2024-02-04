import { InvalidCredentialsError } from "@/domain/core/errors/invalid-credentials";
import { UserRepostiory } from "../repositories/user-repository";
import { Injectable } from "@nestjs/common";
import { ResourceNotFoundError } from "@/domain/core/errors/resource-not-found";
import { AnswerRepository } from "../repositories/answer-repository";

interface DeleteAnswerParams {
  authorId: string
  answerId: string
}

@Injectable()
export class DeleteAnswerUseCase {
  constructor(
    private usersRepository: UserRepostiory, 
    private answerRepository: AnswerRepository
  ) { }

  async execute({ authorId, answerId }: DeleteAnswerParams) {
    const user = await this.usersRepository.getById(authorId)
    if (!user) throw new ResourceNotFoundError()

    const answer = await this.answerRepository.getById(answerId)
    if (!answer) throw new ResourceNotFoundError()

    if(!answer.authorId.equals(user.id)) throw new InvalidCredentialsError()

    await this.answerRepository.delete(answer.id.toString())
  }
}