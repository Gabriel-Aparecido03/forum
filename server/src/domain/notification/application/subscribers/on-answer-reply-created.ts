import { Injectable } from "@nestjs/common";
import { DomainEvents } from "@/domain/core/events/domian-events";
import { EventHandler } from "@/domain/core/events/event-handler";
import { AnswerRepository } from "@/domain/forum/application/repositories/answer-repository";
import { AnswerReplyCreatedEvent } from "@/domain/forum/enterprise/events/answer-reply-created.event";
import { SendNotificationUseCase } from "../use-cases/send-notification";

@Injectable()
export class OnAnswerReplyCreated implements EventHandler {

  constructor(private answerRepository : AnswerRepository,private sendNotification : SendNotificationUseCase) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void { 
    DomainEvents.register(this.sendNewAnswerNotification.bind(this),AnswerReplyCreatedEvent.name)
  }

  private async sendNewAnswerNotification({ answerReply }:AnswerReplyCreatedEvent) {
    const answer = await this.answerRepository.getById(answerReply.answerId.toString())
    if(answer) {
      await this.sendNotification.execute({
        content : `${answer.content}`,
        recipientd : answer.authorId.toString(),
        title : `You have new reply at yout answer at ${answer.content.substring(0,20).concat('...')}`
      })
    }
  }
}