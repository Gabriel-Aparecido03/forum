import { AnswerReplyAttachmentRepository } from "@/domain/forum/application/repositories/answer-reply-attachments-repository";
import { AnswerReplyAttachment } from "@/domain/forum/enterprise/entities/answer-reply-attachment";
import { Injectable } from "@nestjs/common";
import { PrismaAnswerReplyAttachmentMapper } from "../mapper/prisma-answer-reply-attachments-mapper";
import { PrismaService } from "../prisma.service";


@Injectable()
export class PrismaAnswerReplyAttachmentsRepository implements AnswerReplyAttachmentRepository {

  constructor(private prismaService: PrismaService) { }


  async getByAnswerReplyId(answerReplyId: string): Promise<AnswerReplyAttachment[]> {
    const result = await this.prismaService.attachments.findMany({
      where : {
        answer_reply_id : answerReplyId
      }
    })

    return result.map( item => new PrismaAnswerReplyAttachmentMapper().toDomain(item))
  }


  async createMany(attachments: AnswerReplyAttachment[]): Promise<void> {
    await this.prismaService.attachments.updateMany({
      where: {
        id: attachments[0].id.toString()
      },
      data: {
        answer_reply_id: attachments[0].answerReplyId.toString()
      }
    })
  }

  async deleteMany(attachments: AnswerReplyAttachment[]): Promise<void> {
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