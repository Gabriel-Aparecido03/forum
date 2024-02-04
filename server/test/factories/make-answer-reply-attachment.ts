import { UniqueEntityID } from "../../src/domain/core/unique-entity-id"
import { AnswerReplyAttachment, AnswerReplyAttachmentsProps } from "../../src/domain/forum/enterprise/entities/answer-reply-attachment"

export function makeAnswerReplyAttachment(
  override: Partial<AnswerReplyAttachmentsProps> = {},
  id?: UniqueEntityID,
) {
  const answerReply = AnswerReplyAttachment.create(
    {
      attachmentId : new UniqueEntityID(),
      answerReplyId : new UniqueEntityID(),
      ...override,
    },
    id,
  )

  return answerReply
}