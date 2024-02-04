import { UniqueEntityID } from "@/domain/core/unique-entity-id"
import { Attachment, AttachmentProps } from "@/domain/forum/enterprise/entities/attachment"
import { faker } from "@faker-js/faker"

export function makeAttachment(
  override: Partial<AttachmentProps> = {},
  id?: UniqueEntityID,
) {
  const attachment = Attachment.create(
    {
      name: faker.lorem.slug(),
      url: faker.lorem.slug(),
      ...override,
    },
    id,
  )

  return attachment
}