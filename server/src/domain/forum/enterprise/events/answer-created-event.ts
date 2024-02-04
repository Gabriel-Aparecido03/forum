import { DomainEvent } from "@/domain/core/events/domain-event";
import { UniqueEntityID } from "@/domain/core/unique-entity-id";
import { Answer } from "../entities/answer";

export class AnswerCreatedEvent implements DomainEvent {
  public ocurredAt: Date;
  public answer : Answer
 
  constructor(answer : Answer) {
    this.answer = answer
    this.ocurredAt = new Date()
  }

  getAggregateId(): UniqueEntityID {
    return this.answer.id
  }
}