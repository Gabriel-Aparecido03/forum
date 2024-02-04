import { Entity } from "../../../core/entity";
import { UniqueEntityID } from "@/domain/core/unique-entity-id";

export interface TopicAttachmentsProps {
  topicId : UniqueEntityID
  attachmentId : UniqueEntityID
}

export class TopicAttachment extends Entity<TopicAttachmentsProps> {
  get topicId() {
    return this.props.topicId
  }

  get attachmentId() {
    return this.props.attachmentId
  }

  static create(props: TopicAttachmentsProps, id?: UniqueEntityID) {
    const topicAttachment = new TopicAttachment(props, id)

    return topicAttachment
  }
}