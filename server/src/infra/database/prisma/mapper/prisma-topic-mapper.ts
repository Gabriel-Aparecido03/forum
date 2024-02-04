import { UniqueEntityID } from "@/domain/core/unique-entity-id";
import { Topic } from "@/domain/forum/enterprise/entities/topic";
import { TopicAttachment } from "@/domain/forum/enterprise/entities/topic-attachment";
import { Slug } from "@/domain/forum/enterprise/entities/value-objects/Slug";
import { Topic as PrismaTopic, Prisma } from "@prisma/client";

export class PrismaTopicMapper {
  toDomain(raw : PrismaTopic & {Attachments?: { id: string; }[]} & { ItsRelavant: {user_id: string }[] } & { ItsNotRelevant: {user_id: string }[] }) {
    if(!raw) return null
    let attachment = []
    if(raw.Attachments.length >0) {
      attachment = raw.Attachments.map((attachmentId) => {
        return TopicAttachment.create({
          attachmentId: new UniqueEntityID(attachmentId.id),
          topicId: new UniqueEntityID(raw.id)
        }, new UniqueEntityID(attachmentId.id))
      })
    }

    let listOfNotRelevant = raw.ItsNotRelevant.map(i => i.user_id)
    let listOfRelevant = raw.ItsRelavant.map(i => i.user_id)

    return Topic.create({
      authorId : new UniqueEntityID(raw.user_id),
      content : raw.content,
      slug : Slug.create(raw.slug),
      title : raw.title,
      createdAt : raw.createdAt,
      updatedAt : raw.updatedAt,
    }, new UniqueEntityID(raw.id)
    )
  }

  toPrisma(topic : Topic ) : Prisma.TopicUncheckedCreateInput {
    if(!topic) return null
    return {
      content : topic.content, 
      slug : topic.slug.value,
      title : topic.title,
      user_id : topic.authorId.toString(),
      id : topic.id.toString(),
      updatedAt : topic.updatedAt
    }
  }
}