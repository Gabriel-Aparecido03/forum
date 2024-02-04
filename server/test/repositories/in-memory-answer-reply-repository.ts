import { DomainEvents } from "../../src/domain/core/events/domian-events"
import { AnswerReplyRepository, PaginationParams } from "../../src/domain/forum/application/repositories/answer-reply-repository"
import { AnswerReply } from "../../src/domain/forum/enterprise/entities/answer-reply"

export class InMemoryAnswerReplyRepository extends AnswerReplyRepository {

  public items : AnswerReply[] = []

  async create(answerReply: AnswerReply): Promise<void> {
    this.items.push(answerReply)
    DomainEvents.dispatchEventsForAggregate(answerReply.id)
  }

  async delete(id: string): Promise<void> {
    const result = this.items.filter( item => item.id.toString() !== id )
    this.items = result
  }

  async updated(answerReply: AnswerReply): Promise<void> {
    const findIndex = this.items.findIndex(item => item.id.toString() === answerReply.id.toString() )
    this.items[findIndex] = answerReply
  }

  async getById(id: string): Promise<AnswerReply | null> {
    const item = this.items.find(item => item.id.toString() === id )
    return item ?? null
  }

  async fetchAnswerReply({ page }: PaginationParams): Promise<AnswerReply[]> {
    let answerReplys = this.items
    return answerReplys.slice((page - 1) * 20, page * 20 )
  }
}