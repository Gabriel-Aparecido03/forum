import { AggregateRoot } from "../../../core/aggregate-root"
import { Optional } from "../../../core/types/optional"
import { UniqueEntityID } from "@/domain/core/unique-entity-id"
import { Slug } from "./value-objects/Slug"

export interface TopicPropsType {
  authorId : UniqueEntityID
  title : string
  slug : Slug
  content : string
  createdAt : Date
  updatedAt : Date | null
}

export class Topic extends AggregateRoot<TopicPropsType> {

  get authorId() {
    return this.props.authorId
  }

  get title() {
    return this.props.title
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

  get updatedAt() : Date | null {
    return this.props.updatedAt 
  }

  set updatedAt(updatedAt : Date) {
    this.props.updatedAt = updatedAt
    this.touch()
  }

  set content(content : string) {
    this.props.content = content
    this.touch()
  }

  set title(title : string) {
    this.props.title = title
    this.touch()
  }

  touch() {
    this.props.updatedAt = new Date()
  }

  static create(props : Optional<TopicPropsType,'createdAt' | 'updatedAt' >, id ?: UniqueEntityID ) {
    const user = new Topic({
      ...props,
      createdAt : props.createdAt ?? new Date(),
      updatedAt : props.updatedAt ?? null,
      slug : props.slug ?? Slug.createFromText(props.title)
    },id)

    return user
  }
}