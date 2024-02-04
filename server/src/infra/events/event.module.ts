import { OnAnswerCreated } from "@/domain/notification/application/subscribers/on-answer-created";
import { OnAnswerReplyCreated } from "@/domain/notification/application/subscribers/on-answer-reply-created";
import { SendNotificationUseCase } from "@/domain/notification/application/use-cases/send-notification";
import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";

@Module({
  imports : [DatabaseModule],
  providers : [
    OnAnswerCreated,
    OnAnswerReplyCreated,
    SendNotificationUseCase
  ]
})
export class EventsModule {}