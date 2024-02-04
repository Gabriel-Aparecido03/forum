import { InvalidCredentialsError } from "@/domain/core/errors/invalid-credentials";
import { UserRepostiory } from "../repositories/user-repository";
import { Injectable } from "@nestjs/common";
import { ResourceNotFoundError } from "@/domain/core/errors/resource-not-found";
import { AnswerRepository } from "../repositories/answer-repository";
import { AnswerReplyRepository } from "../repositories/answer-reply-repository";
import { AnswerReply } from "../../enterprise/entities/answer-reply";

interface CreateAnswerReplyParams {
  content: string
  authorId: string
  answerId: string
}

@Injectable()
export class CreateAnswerReplyUseCase {
  constructor(
    private answerReplyRepository: AnswerReplyRepository, 
    private usersRepository: UserRepostiory, 
    private answerRepository: AnswerRepository
  ) { }

  async execute({ authorId, content , answerId }: CreateAnswerReplyParams) {
    const user = await this.usersRepository.getById(authorId)
    if (!user) throw new InvalidCredentialsError()

    const answer = await this.answerRepository.getById(answerId)
    if(!answer) throw new ResourceNotFoundError()

    const answerReply = AnswerReply.create({
      authorId: user.id,
      content,
      answerId : answer.id
    })

    await this.answerReplyRepository.create(answerReply)
  }
}