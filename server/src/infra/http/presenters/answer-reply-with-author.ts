import { AnswerReplyWithAuthor } from "@/domain/forum/enterprise/entities/value-objects/answer-reply-with-author";

export class AnswerReplyWithAuthorPresenter {
  static toHTTP(answer: AnswerReplyWithAuthor) {
    return {
      id: answer.id.toString(),
      content: answer.content,
      authorId: answer.authorId.toString(),
      createdAt: answer.createdAt,
      updatedAt: answer.updatedAt,
      author : answer.author,
      answerId : answer.answerId.toString()
    }
  }
}