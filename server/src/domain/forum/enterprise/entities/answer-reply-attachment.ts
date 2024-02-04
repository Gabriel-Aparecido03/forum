import { Entity } from "../../../core/entity";
import { UniqueEntityID } from "@/domain/core/unique-entity-id";

export interface AnswerReplyAttachmentsProps {
  answerReplyId : UniqueEntityID
  attachmentId : UniqueEntityID
}

export class AnswerReplyAttachment extends Entity<AnswerReplyAttachmentsProps> {
  get answerReplyId() {
    return this.props.answerReplyId
  }

  get attachmentId() {
    return this.props.attachmentId
  }

  static create(props: AnswerReplyAttachmentsProps, id?: UniqueEntityID) {
    const answerreplyAttachment = new AnswerReplyAttachment(props, id)

    return answerreplyAttachment
  }
}