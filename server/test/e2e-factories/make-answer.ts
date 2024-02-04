import { Answer } from "@/domain/forum/enterprise/entities/answer";
import { PrismaAnswerMapper } from "@/infra/database/prisma/mapper/prisma-answer-mapper";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AnswerFactory {

  constructor(private prismaService : PrismaService) {}

  async execute(answer: Answer) {
    const data = new PrismaAnswerMapper().toPrisma(answer)

    await this.prismaService.answer.create({ data })
  }
}