import { AnswerReply } from "src/domain/forum/enterprise/entities/answer-reply";

export class AnswerReplyPresenter {
  static toHTTP(answerReply : AnswerReply) {
    return {
      id : answerReply.id.toString(),
      content : answerReply.content,
      authorId : answerReply.authorId.toString(),
      createdAt : answerReply.createdAt,
      updatedAt : answerReply.updatedAt
    }
  }
}