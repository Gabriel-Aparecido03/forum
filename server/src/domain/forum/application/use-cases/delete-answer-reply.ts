import { InvalidCredentialsError } from "@/domain/core/errors/invalid-credentials";
import { UserRepostiory } from "../repositories/user-repository";
import { Injectable } from "@nestjs/common";
import { ResourceNotFoundError } from "@/domain/core/errors/resource-not-found";
import { AnswerReplyRepository } from "../repositories/answer-reply-repository";

interface DeleteAnswerReplyParams {
  authorId: string
  answerReplyId: string
}

@Injectable()
export class DeleteAnswerReplyUseCase {
  constructor(
    private usersRepository: UserRepostiory, 
    private answerReplyRepository: AnswerReplyRepository
  ) { }

  async execute({ authorId, answerReplyId }: DeleteAnswerReplyParams) {
    const user = await this.usersRepository.getById(authorId)
    if (!user) throw new ResourceNotFoundError()

    const answer = await this.answerReplyRepository.getById(answerReplyId)
    if (!answer) throw new ResourceNotFoundError()

    if(!answer.authorId.equals(user.id)) throw new InvalidCredentialsError()

    await this.answerReplyRepository.delete(answer.id.toString())
  }
}