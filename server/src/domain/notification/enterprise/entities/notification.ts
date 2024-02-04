import { Entity } from "../../../core/entity";
import { Optional } from "@/domain/core/types/optional";
import { UniqueEntityID } from "@/domain/core/unique-entity-id";

export interface NotificationProps {
  title : string
  content : string
  recipientId : UniqueEntityID
  readAt?: Date | null
  sendAt : Date
}

export class Notification extends Entity<NotificationProps> {

  get title() {
    return this.props.title
  }

  get content() {
    return this.props.content
  }

  get recipientId() {
    return this.props.recipientId
  }

  get readAt() {
    return this.props.readAt
  }

  get sendAt() {
    return this.props.sendAt
  }

  read() {
    this.props.readAt = new Date()
  }

  static create(props : Optional<NotificationProps,'readAt'|'sendAt'>, id ?: UniqueEntityID ) {
    const notification = new Notification({
      ...props,
      readAt : props.readAt ?? null,
      sendAt : props.sendAt ?? new Date()
    },id)

    return notification
  }
}