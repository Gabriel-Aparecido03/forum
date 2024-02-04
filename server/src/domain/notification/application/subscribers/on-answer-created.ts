import { Injectable } from "@nestjs/common";
import { DomainEvents } from "@/domain/core/events/domian-events";
import { EventHandler } from "@/domain/core/events/event-handler";
import { TopicRepository } from "../../../forum/application/repositories/topic-repository";
import { AnswerCreatedEvent } from "../../../forum/enterprise/events/answer-created-event";
import { SendNotificationUseCase } from "../use-cases/send-notification";

@Injectable()
export class OnAnswerCreated implements EventHandler {

  constructor(private topicsRepository : TopicRepository,private sendNotification : SendNotificationUseCase) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void { 
    DomainEvents.register(this.sendNewAnswerNotification.bind(this),AnswerCreatedEvent.name)
  }

  private async sendNewAnswerNotification({ answer }:AnswerCreatedEvent) {
    const topic = await this.topicsRepository.getById(answer.topicId.toString())
    if(topic) {
      await this.sendNotification.execute({
        content : `${answer.content}`,
        recipientd : topic.authorId.toString(),
        title : `New answer at ${topic.title.substring(0,20).concat('...')}`
      })
    }
  }
}