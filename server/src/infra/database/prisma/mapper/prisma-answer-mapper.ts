import { UniqueEntityID } from "@/domain/core/unique-entity-id";
import { Answer } from "@/domain/forum/enterprise/entities/answer";
import { AnswerAttachment } from "@/domain/forum/enterprise/entities/answer-attachment";
import { Answer as PrismaAnswer, Prisma } from "@prisma/client";

export class PrismaAnswerMapper {
  toDomain(raw: PrismaAnswer) {
    if (!raw) return null

    return Answer.create({
      authorId: new UniqueEntityID(raw.user_id),
      content: raw.content,
      topicId: new UniqueEntityID(raw.topic_id),
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt
    }, new UniqueEntityID(raw.id))
  }

  toPrisma(answer: Answer): Prisma.AnswerUncheckedCreateInput {
    if (!answer) return null
    return {
      content: answer.content,
      topic_id: answer.topicId.toString(),
      user_id: answer.authorId.toString(),
      createdAt: answer.createdAt,
      id: answer.id.toString(),
      updatedAt: answer.updatedAt
    }
  }
}