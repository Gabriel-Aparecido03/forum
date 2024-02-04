import { UniqueEntityID } from "@/domain/core/unique-entity-id"
import { ValueObject } from "@/domain/core/value-object"

export interface AnswerReplyWithAuthorProps {
  authorId: UniqueEntityID
  author: string
  content: string
  createdAt: Date
  updatedAt?: Date | null
  id : UniqueEntityID
  answerId : UniqueEntityID
}

export class AnswerReplyWithAuthor extends ValueObject<AnswerReplyWithAuthorProps> {

  get authorId() {
    return this.props.authorId
  }

  get author() {
    return this.props.author
  }

  get id() {
    return this.props.id
  }

  get content() {
    return this.props.content
  }

  get answerId() {
    return this.props.answerId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(props: AnswerReplyWithAuthorProps) {
    return new AnswerReplyWithAuthor(props)
  }
}