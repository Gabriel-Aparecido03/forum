import { AnswerReply } from "@/domain/forum/enterprise/entities/answer-reply";
import { PrismaAnswerReplyMapper } from "@/infra/database/prisma/mapper/prisma-answer-reply-mapper";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AnswerReplyFactory {

  constructor(private prismaService : PrismaService) {}

  async execute(answerReply: AnswerReply) {
    const data = new PrismaAnswerReplyMapper().toPrisma(answerReply)

    await this.prismaService.answerReply.create({ data })
  }
}