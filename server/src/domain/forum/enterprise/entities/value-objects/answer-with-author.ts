import { UniqueEntityID } from "@/domain/core/unique-entity-id"
import { Slug } from "./Slug"
import { ValueObject } from "@/domain/core/value-object"

export interface AnswerWithAuthorProps {
  authorId: UniqueEntityID
  author: string
  content: string
  createdAt: Date
  updatedAt?: Date | null
  id : UniqueEntityID
  topicId : UniqueEntityID
}

export class AnswerWithAuthor extends ValueObject<AnswerWithAuthorProps> {

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

  get topicId() {
    return this.props.topicId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(props: AnswerWithAuthorProps) {
    return new AnswerWithAuthor(props)
  }
}