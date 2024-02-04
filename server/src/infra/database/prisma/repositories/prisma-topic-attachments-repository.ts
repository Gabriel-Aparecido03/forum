import { TopicAttachmentRepository } from "@/domain/forum/application/repositories/topic-attachment-repository";
import { TopicAttachment } from "@/domain/forum/enterprise/entities/topic-attachment";
import { Injectable } from "@nestjs/common";
import { PrismaTopicAttachmentMapper } from "../mapper/prisma-topic-attachments-mapper";
import { PrismaService } from "../prisma.service";


@Injectable()
export class PrismaTopicAttachmentsRepository implements TopicAttachmentRepository {

  constructor(private prismaService: PrismaService) { }

  async getByTopicId(topicId: string): Promise<TopicAttachment[]> {
    const result = await this.prismaService.attachments.findMany({
      where: {
        topic_id: topicId
      }
    })

    return result.map(item => new PrismaTopicAttachmentMapper().toDomain(item))
  }

  async createMany(attachments: TopicAttachment[]): Promise<void> {
    await this.prismaService.attachments.updateMany({
      where: {
        id: {
          in: attachments.map(i => i.id.toString())
        }
      },
      data: {
        topic_id: attachments[0].topicId.toString()
      }
    })
  }

  async deleteMany(attachments: TopicAttachment[]): Promise<void> {
    await this.prismaService.attachments.deleteMany({
      where: {
        id: {
          in: attachments.map(i => i.id.toString())
        }
      }
    })
  }

  async deleteManyByTopicId(topicId: string): Promise<void> {
    await this.prismaService.attachments.deleteMany({
      where : {
        topic_id  : topicId
      }
    })
  }

}