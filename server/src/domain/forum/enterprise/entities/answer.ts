import { AggregateRoot } from "../../../core/aggregate-root"
import { Optional } from "../../../core/types/optional"
import { UniqueEntityID } from "@/domain/core/unique-entity-id"
import { AnswerCreatedEvent } from "../events/answer-created-event"

export interface AnswerPropsType {
  authorId : UniqueEntityID
  topicId : UniqueEntityID
  content : string
  createdAt : Date
  updatedAt : Date | null
}

export class Answer extends AggregateRoot<AnswerPropsType> {

  get authorId() {
    return this.props.authorId
  }

  get topicId() {
    return this.props.topicId
  }

  get content() {
    return this.props.content
  }

  set content(content : string) {
    this.props.content = content
    this.props.updatedAt = new Date()
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() : Date | null {
    return this.props.updatedAt 
  }

  set updatedAt(updatedAt : Date) {
    this.props.updatedAt = new Date()
  }


  touch() {
    this.props.updatedAt = new Date()
  }

  static create(props : Optional<AnswerPropsType,'createdAt' | 'updatedAt' >, id ?: UniqueEntityID ) {
    const answer = new Answer({
      ...props,
      createdAt : props.createdAt ?? new Date(),
      updatedAt : props.updatedAt ?? null,
    },id)

    const isNewAnswer = !id 
    
    if(isNewAnswer) {
      answer.addDomainEvent(new AnswerCreatedEvent(answer))
    }

    return answer
  }
}