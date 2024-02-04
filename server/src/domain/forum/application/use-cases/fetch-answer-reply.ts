import { Injectable } from "@nestjs/common";
import { AnswerReplyRepository } from "../repositories/answer-reply-repository";

interface FetchAnswerReplyParams {
  answerId : string
}

@Injectable()
export class FetchAnswerReplysUseCase {
  constructor(private answerReplyRepository: AnswerReplyRepository) { }

  async execute({ answerId }: FetchAnswerReplyParams) {
    const answersReply = await this.answerReplyRepository.fetchAnswerReply({ answerId })
    return { answersReply }
  }
}