import { UniqueEntityID } from "@/domain/core/unique-entity-id"
import { AnswerReplyAttachment } from "@/domain/forum/enterprise/entities/answer-reply-attachment"
import { Prisma , Attachments as PrismaAnswerReplyAttachment } from "@prisma/client"

export class PrismaAnswerReplyAttachmentMapper {
  toDomain(raw : PrismaAnswerReplyAttachment) {
    return AnswerReplyAttachment.create({
      attachmentId : new UniqueEntityID(raw.id),
      answerReplyId : new UniqueEntityID(raw.answer_reply_id)
    }, new UniqueEntityID(raw.id)
    )
  }

  toPrisma(answerAttachment : AnswerReplyAttachment ) : Prisma.AttachmentsUncheckedCreateInput { 
    return {
      id : answerAttachment.attachmentId.toString(),
      answer_reply_id : answerAttachment.answerReplyId.toString(),
      name : '',
      url : ''
    }
  }
}