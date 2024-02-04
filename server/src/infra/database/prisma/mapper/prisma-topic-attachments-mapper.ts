import { UniqueEntityID } from "@/domain/core/unique-entity-id"
import { TopicAttachment } from "@/domain/forum/enterprise/entities/topic-attachment"
import { Prisma , Attachments as PrismaTopicAttachment } from "@prisma/client"

export class PrismaTopicAttachmentMapper {
  toDomain(raw : PrismaTopicAttachment) {
    return TopicAttachment.create({
      attachmentId : new UniqueEntityID(raw.id),
      topicId : new UniqueEntityID(raw.topic_id)
    }, new UniqueEntityID(raw.id)
    )
  }

  toPrisma(topicAttachment : TopicAttachment ) : Prisma.AttachmentsUncheckedCreateInput { 
    return {
      id : topicAttachment.attachmentId.toString(),
      topic_id : topicAttachment.topicId.toString(),
      name : '',
      url : ''
    }
  }
}