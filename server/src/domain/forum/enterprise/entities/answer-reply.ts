import { AggregateRoot } from "../../../core/aggregate-root"
import { Optional } from "../../../core/types/optional"
import { UniqueEntityID } from "@/domain/core/unique-entity-id"
import { AnswerReplyCreatedEvent } from "../events/answer-reply-created.event"

export interface AnswerReplyPropsType {
  authorId : UniqueEntityID
  answerId : UniqueEntityID
  content : string
  createdAt : Date
  updatedAt : Date | null
}

export class AnswerReply extends AggregateRoot<AnswerReplyPropsType> {

  get authorId() {
    return this.props.authorId
  }

  get answerId() {
    return this.props.answerId
  }

  get content() {
    return this.props.content
  }

  set content(content : string ) {
    this.props.content = content
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() : Date | null {
    return this.props.updatedAt 
  }

  set updatedAt(updatedAt : Date) {
    this.props.updatedAt = updatedAt
  }


  touch() {
    this.props.updatedAt = new Date()
  }

  static create(props : Optional<AnswerReplyPropsType,'createdAt' | 'updatedAt' >, id ?: UniqueEntityID ) {
    const answerReply = new AnswerReply({
      ...props,
      createdAt : props.createdAt ?? new Date(),
      updatedAt : props.updatedAt ?? null,
    },id)

    const isNewAnswerReply = !id 

    if(isNewAnswerReply) {
      answerReply.addDomainEvent(new AnswerReplyCreatedEvent(answerReply))
    }


    return answerReply
  }
}