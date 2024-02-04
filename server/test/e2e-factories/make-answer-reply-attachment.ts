import { AnswerReplyAttachment } from "@/domain/forum/enterprise/entities/answer-reply-attachment";
import { PrismaAnswerReplyAttachmentMapper } from "@/infra/database/prisma/mapper/prisma-answer-reply-attachments-mapper";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AnswerReplyAttachmentFactory {

  constructor(private prismaService : PrismaService) {}

  async execute(answerReplyAttachment: AnswerReplyAttachment[]) {
    const data = answerReplyAttachment.map( i =>  new PrismaAnswerReplyAttachmentMapper().toPrisma(i))
    await this.prismaService.attachments.createMany({ data })
  }
}