import { AnswerAttachmentRepository } from "@/domain/forum/application/repositories/answer-attachments-repository";
import { AnswerAttachment } from "@/domain/forum/enterprise/entities/answer-attachment";
import { Injectable } from "@nestjs/common";
import { PrismaAnswerAttachmentMapper } from "../mapper/prisma-answer-attachments-mapper";
import { PrismaService } from "../prisma.service";


@Injectable()
export class PrismaAnswerAttachmentsRepository implements AnswerAttachmentRepository {

  constructor(private prismaService: PrismaService) { }

  async getByAnswerId(answerId: string): Promise<AnswerAttachment[]> {
    const result = await this.prismaService.attachments.findMany({
      where: {
        answer_id: answerId
      }
    })
    return result.map(item => new PrismaAnswerAttachmentMapper().toDomain(item))
  }


  async createMany(attachments: AnswerAttachment[]): Promise<void> {
    await this.prismaService.attachments.updateMany({
      where: {
        id: {
          in : attachments.map( i => i.id.toString())
        }
      },
      data: {
        answer_id: attachments[0].answerId.toString()
      }
    })
  }

  async deleteMany(attachments: AnswerAttachment[]): Promise<void> {

    const attachmentIds = attachments.map((attachment) => {
      return attachment.attachmentId.toString()
    })

    await this.prismaService.attachments.deleteMany({
      where: {
        id: {
          in: attachmentIds
        }
      }
    })
  }


}