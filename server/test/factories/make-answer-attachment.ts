import { UniqueEntityID } from "../../src/domain/core/unique-entity-id"
import { AnswerAttachment, AnswerAttachmentProps } from "../../src/domain/forum/enterprise/entities/answer-attachment"

export function makeAnswerAttachment(
  override: Partial<AnswerAttachmentProps> = {},
  id?: UniqueEntityID,
) {
  const question = AnswerAttachment.create(
    {
      attachmentId : new UniqueEntityID(),
      answerId : new UniqueEntityID(),
      ...override,
    },
    id,
  )

  return question
}