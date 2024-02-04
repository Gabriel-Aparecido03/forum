import { InvalidCredentialsError } from "@/domain/core/errors/invalid-credentials";
import { UserRepostiory } from "../repositories/user-repository";
import { Injectable } from "@nestjs/common";
import { ResourceNotFoundError } from "@/domain/core/errors/resource-not-found";
import { AnswerRepository } from "../repositories/answer-repository";
import { AnswerReplyRepository } from "../repositories/answer-reply-repository";
import { AnswerReply } from "../../enterprise/entities/answer-reply";

interface EditAnswerReplyParams {
  content: string
  authorId: string
  answerId: string
  answerReplyId : string
}

@Injectable()
export class EditAnswerReplyUseCase {
  constructor(
    private answerReplyRepository: AnswerReplyRepository, 
    private usersRepository: UserRepostiory, 
    private answerRepository: AnswerRepository
  ) { }

  async execute({ authorId, content , answerId , answerReplyId }: EditAnswerReplyParams) {
    const user = await this.usersRepository.getById(authorId)
    if (!user) throw new InvalidCredentialsError()

    const answer = await this.answerRepository.getById(answerId)
    if(!answer) throw new ResourceNotFoundError()

    const answerReply = await this.answerReplyRepository.getById(answerReplyId)
    if(!answerReply) throw new ResourceNotFoundError()

    if(!answerReply.authorId.equals(user.id)) throw new InvalidCredentialsError()

    answerReply.content = content

    await this.answerReplyRepository.updated(answerReply)
  }
}