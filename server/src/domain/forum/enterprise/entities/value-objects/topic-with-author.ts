import { UniqueEntityID } from "@/domain/core/unique-entity-id"
import { Slug } from "./Slug"
import { ValueObject } from "@/domain/core/value-object"

export interface TopicWithAuthorProps {
  authorId: UniqueEntityID
  author: string
  title: string
  content: string
  createdAt: Date
  updatedAt?: Date | null
  slug: Slug
  id : UniqueEntityID
}

export class TopicWithAuthor extends ValueObject<TopicWithAuthorProps> {

  get authorId() {
    return this.props.authorId
  }

  get author() {
    return this.props.author
  }

  get title() {
    return this.props.title
  }

  get id() {
    return this.props.id
  }

  get content() {
    return this.props.content
  }

  get slug() {
    return this.props.slug
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(props: TopicWithAuthorProps) {
    return new TopicWithAuthor(props)
  }
}