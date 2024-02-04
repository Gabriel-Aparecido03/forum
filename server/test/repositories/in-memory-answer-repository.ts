import { DomainEvents } from "../../src/domain/core/events/domian-events";
import { AnswerRepository } from "../../src/domain/forum/application/repositories/answer-repository";
import { PaginationParams } from "../../src/domain/forum/application/repositories/topic-repository";
import { Answer } from "../../src/domain/forum/enterprise/entities/answer";

export class InMemoryAnswerRepository extends AnswerRepository {

  public items : Answer[] = []

  async create(answer: Answer): Promise<void> {
    this.items.push(answer)
    DomainEvents.dispatchEventsForAggregate(answer.id)
  }

  async delete(id: string): Promise<void> {
    const result = this.items.filter( item => item.id.toString() !== id )
    this.items = result
  }

  async updated(answer: Answer): Promise<void> {
    const findIndex = this.items.findIndex(item => item.id.toString() === answer.id.toString())
    this.items[findIndex] = answer
  }

  async getById(id: string): Promise<Answer | null> {
    const item = this.items.find(item => item.id.toString() === id )
    return item ?? null
  }

  async fetchAnswer({ page }: PaginationParams): Promise<Answer[]> {
    let answers = this.items
    return answers.slice((page - 1) * 20, page * 20 )
  }
}