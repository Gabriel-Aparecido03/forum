import { DomainEvents } from "@/domain/core/events/domian-events";
import { AnswerAttachmentRepository } from "@/domain/forum/application/repositories/answer-attachments-repository";
import { PaginationParams } from "@/domain/forum/application/repositories/answer-reply-repository";
import { AnswerRepository } from "@/domain/forum/application/repositories/answer-repository";
import { Injectable } from "@nestjs/common";
import { PrismaAnswerMapper } from "../mapper/prisma-answer-mapper";
import { PrismaService } from "../prisma.service";
import { Answer } from "@/domain/forum/enterprise/entities/answer";
import { AnswerWithAuthor } from "@/domain/forum/enterprise/entities/value-objects/answer-with-author";
import { PrismaAnswerWithAuthorMapper } from "../mapper/prisma-answer-with-author-mapper";

@Injectable()
export class PrismaAnswerRepository implements AnswerRepository {

  constructor(private prismaService: PrismaService, private answerAttachmentRepository: AnswerAttachmentRepository) { }

  async create(answer: Answer): Promise<void> {
    const data = new PrismaAnswerMapper().toPrisma(answer)
    await this.prismaService.answer.create({ data })

    DomainEvents.dispatchEventsForAggregate(answer.id)
  }

  async delete(id: string): Promise<void> {
    await this.answerAttachmentRepository.getByAnswerId(id)
    await this.prismaService.answer.delete({
      where: {
        id
      }
    })
  }

  async updated(answer: Answer): Promise<void> {
    const data = new PrismaAnswerMapper().toPrisma(answer)
    await this.prismaService.answer.update({
      where: {
        id: data.id
      },
      data
    })
  }

  async getById(id: string): Promise<Answer> {
    const result = await this.prismaService.answer.findUnique({
      where: {
        id
      }
    })
    const answer = new PrismaAnswerMapper().toDomain(result)
    return answer
  }

  async fetchAnswer({ topicId }): Promise<AnswerWithAuthor[]> {

    const result = await this.prismaService.answer.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      where: {
        topic_id: topicId
      },
      include: {
        user : true
      }
    })
    
    return result.map(item => new PrismaAnswerWithAuthorMapper().toDomain(item))
  }
}