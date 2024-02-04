import { faker } from "@faker-js/faker"
import { UniqueEntityID } from "../../src/domain/core/unique-entity-id"
import { TopicAttachment, TopicAttachmentsProps } from "../../src/domain/forum/enterprise/entities/topic-attachment"

export function makeTopicAttachment(
  override: Partial<TopicAttachmentsProps> = {},
  id?: UniqueEntityID,
) {
  const title = faker.lorem.sentence()
  const question = TopicAttachment.create(
    {
      attachmentId : new UniqueEntityID(),
      topicId : new UniqueEntityID(),
      ...override,
    },
    id,
  )

  return question
}