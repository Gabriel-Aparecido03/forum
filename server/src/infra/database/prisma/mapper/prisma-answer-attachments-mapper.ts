import { UniqueEntityID } from "@/domain/core/unique-entity-id"
import { AnswerAttachment } from "@/domain/forum/enterprise/entities/answer-attachment"
import { Prisma , Attachments as PrismaAnswerAttachment } from "@prisma/client"

export class PrismaAnswerAttachmentMapper {
  toDomain(raw : PrismaAnswerAttachment) {
    return AnswerAttachment.create({
      attachmentId : new UniqueEntityID(raw.id),
      answerId : new UniqueEntityID(raw.answer_id)
    }, new UniqueEntityID(raw.id))
  }

  toPrisma(answerAttachment : AnswerAttachment ) : Prisma.AttachmentsUncheckedCreateInput { 
    return {
      id : answerAttachment.attachmentId.toString(),
      answer_id : answerAttachment.answerId.toString(),
      name : answerAttachment.attachmentId.toString(),
      url : ''
    }
  }
}