import { AnswerAttachmentRepository } from "@/domain/forum/application/repositories/answer-attachments-repository";
import { AnswerReplyAttachmentRepository } from "@/domain/forum/application/repositories/answer-reply-attachments-repository";
import { AnswerReplyRepository } from "@/domain/forum/application/repositories/answer-reply-repository";
import { AnswerRepository } from "@/domain/forum/application/repositories/answer-repository";
import { AttachmentsRepository } from "@/domain/forum/application/repositories/attachments-repository";
import { TopicAttachmentRepository } from "@/domain/forum/application/repositories/topic-attachment-repository";
import { TopicRepository } from "@/domain/forum/application/repositories/topic-repository";
import { UserRepostiory } from "@/domain/forum/application/repositories/user-repository";
import { NotificationsRepository } from "@/domain/notification/application/repositories/notification-repository";
import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaAnswerAttachmentsRepository } from "./prisma/repositories/prisma-answer-attachments-repository";
import { PrismaAnswerReplyAttachmentsRepository } from "./prisma/repositories/prisma-answer-reply-attachments-repository";
import { PrismaAnswersReplyRepository } from "./prisma/repositories/prisma-answer-reply-repository";
import { PrismaAnswerRepository } from "./prisma/repositories/prisma-answer-repository";
import { PrismaAttachmentsRepository } from "./prisma/repositories/prisma-attachments-repository";
import { PrismaNotification } from "./prisma/repositories/prisma-notification-repository";
import { PrismaTopicAttachmentsRepository } from "./prisma/repositories/prisma-topic-attachments-repository";
import { PrismaTopicRepository } from "./prisma/repositories/prisma-topic-repository";
import { PrismaUserRepository } from "./prisma/repositories/prisma-user-repository";


@Module({
  imports: [],
  providers: [
    PrismaService,
    {
      provide : UserRepostiory,
      useClass : PrismaUserRepository
    },
    {
      provide : TopicRepository,
      useClass : PrismaTopicRepository
    },
    {
      provide : TopicAttachmentRepository,
      useClass : PrismaTopicAttachmentsRepository
    },
    {
      provide : AnswerRepository,
      useClass : PrismaAnswerRepository
    },
    { 
      provide : AnswerAttachmentRepository,
      useClass : PrismaAnswerAttachmentsRepository
    },
    { 
      provide : AnswerReplyRepository,
      useClass : PrismaAnswersReplyRepository
    },
    {
      provide: AnswerReplyAttachmentRepository,
      useClass : PrismaAnswerReplyAttachmentsRepository
    },
    {
      provide : AttachmentsRepository,
      useClass : PrismaAttachmentsRepository
    },
    {
      provide : NotificationsRepository,
      useClass : PrismaNotification
    }
  ],
  exports : [
    PrismaService,
    UserRepostiory,
    TopicRepository,
    TopicAttachmentRepository,
    AnswerRepository,
    AnswerAttachmentRepository,
    AnswerReplyRepository,
    AnswerReplyAttachmentRepository,
    AttachmentsRepository,
    NotificationsRepository
  ]
})
export class DatabaseModule {}
