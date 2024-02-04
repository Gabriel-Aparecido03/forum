import { AnswerAttachment } from "@/domain/forum/enterprise/entities/answer-attachment";
import { PrismaAnswerAttachmentMapper } from "@/infra/database/prisma/mapper/prisma-answer-attachments-mapper";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AnswerAttachmentFactory {

  constructor(private prismaService : PrismaService) {}

  async execute(answerAttachment: AnswerAttachment[]) {
    const data = answerAttachment.map( i =>  new PrismaAnswerAttachmentMapper().toPrisma(i))
    await this.prismaService.attachments.createMany({ data })
  }
}