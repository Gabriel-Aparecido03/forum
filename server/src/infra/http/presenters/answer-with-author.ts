import { AnswerWithAuthor } from "@/domain/forum/enterprise/entities/value-objects/answer-with-author";

export class AnswerWithAuthorPresenter {
  static toHTTP(answer: AnswerWithAuthor) {
    return {
      id: answer.id.toString(),
      content: answer.content,
      authorId: answer.authorId.toString(),
      createdAt: answer.createdAt,
      updatedAt: answer.updatedAt,
      author : answer.author,
      topicId : answer.topicId.toString()
    }
  }
}