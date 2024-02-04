import { UniqueEntityID } from "@/domain/core/unique-entity-id";
import { AnswerReply } from "@/domain/forum/enterprise/entities/answer-reply";
import { AnswerReply as PrismaAnswerReply, Prisma } from "@prisma/client";


export class PrismaAnswerReplyMapper {
  toDomain(raw: PrismaAnswerReply ) {
    if (!raw) return null

    return AnswerReply.create({
      authorId : new UniqueEntityID(raw.user_id),
      content : raw.content,
      answerId : new UniqueEntityID(raw.answer_id),
      createdAt : raw.createdAt,
      updatedAt : raw.updatedAt
    }, new UniqueEntityID(raw.id)
    )
  }

  toPrisma(answer: AnswerReply): Prisma.AnswerReplyUncheckedCreateInput {
    if (!answer) return null
    return {
      content : answer.content,
      answer_id : answer.answerId.toString(),
      user_id : answer.authorId.toString(),
      createdAt : answer.createdAt,
      id : answer.id.toString(),
      updatedAt : answer.updatedAt
    }
  }
}