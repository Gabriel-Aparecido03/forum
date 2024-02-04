import { DomainEvents } from "@/domain/core/events/domian-events";
import { AnswerReplyAttachmentRepository } from "@/domain/forum/application/repositories/answer-reply-attachments-repository";
import { AnswerReplyRepository, PaginationParams } from "@/domain/forum/application/repositories/answer-reply-repository";
import { Injectable } from "@nestjs/common";
import { PrismaAnswerReplyMapper } from "../mapper/prisma-answer-reply-mapper";
import { PrismaService } from "../prisma.service";
import { AnswerReply } from "@/domain/forum/enterprise/entities/answer-reply";
import { PrismaAnswerReplyWithAuthorMapper } from "../mapper/prisma-answer-reply-with-author-mapper";
import { AnswerReplyWithAuthor } from "@/domain/forum/enterprise/entities/value-objects/answer-reply-with-author";

@Injectable()
export class PrismaAnswersReplyRepository implements AnswerReplyRepository {

  constructor(private prismaService: PrismaService, private answerReplyAttachmentsRepository: AnswerReplyAttachmentRepository) { }

  async create(answerReply: AnswerReply): Promise<void> {
    const data = new PrismaAnswerReplyMapper().toPrisma(answerReply)
    await this.prismaService.answerReply.create({ data })
    DomainEvents.dispatchEventsForAggregate(answerReply.id)
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.answerReply.delete({
      where: {
        id
      }
    })
  }

  async updated(answerReply: AnswerReply): Promise<void> {
    const data = new PrismaAnswerReplyMapper().toPrisma(answerReply)
    await this.prismaService.answerReply.update({
      where: {
        id: data.id
      },
      data
    })
  }

  async getById(id: string): Promise<AnswerReply> {
    const result = await this.prismaService.answerReply.findUnique({
      where: {
        id
      }
    })

    const answerReply = new PrismaAnswerReplyMapper().toDomain(result)
    return answerReply
  }

  async fetchAnswerReply({ answerId }): Promise<AnswerReplyWithAuthor[]> {
    const result = await this.prismaService.answerReply.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      where: {
        answer_id: answerId
      },
      include: {
        user : true
      }
    })

    return result.map(item => new PrismaAnswerReplyWithAuthorMapper().toDomain(item))
  }

}