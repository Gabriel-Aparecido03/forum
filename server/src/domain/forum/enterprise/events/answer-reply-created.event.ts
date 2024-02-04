import { DomainEvents } from "@/domain/core/events/domian-events";
import { UniqueEntityID } from "@/domain/core/unique-entity-id";
import { AnswerReply } from "../entities/answer-reply";

export class AnswerReplyCreatedEvent implements DomainEvents {
  public answerReply : AnswerReply
  public ocurredAt : Date

  constructor(answerReply : AnswerReply) {
    this.answerReply = answerReply
    this.ocurredAt = new Date()
  }

  getAggregateId(): UniqueEntityID {
    return this.answerReply.id
  }
}