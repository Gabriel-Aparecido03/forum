import { Entity } from "./entity"
import { DomainEvent } from "@/domain/core/events/domain-event"
import { DomainEvents } from "@/domain/core/events/domian-events"

export abstract class AggregateRoot<Props> extends Entity<Props> {
  private _domainEvents : DomainEvent[] = []

  get domainEvents() {
    return this._domainEvents
  }

  protected addDomainEvent(domainEvent : DomainEvent) : void {
    this._domainEvents.push(domainEvent)
    DomainEvents.markAggregateForDispatch(this)
  }

  public clearEvents() {
    this._domainEvents = []
  }
}