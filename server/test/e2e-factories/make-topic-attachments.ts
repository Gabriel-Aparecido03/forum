import { TopicAttachment } from "@/domain/forum/enterprise/entities/topic-attachment";
import { PrismaTopicAttachmentMapper } from "@/infra/database/prisma/mapper/prisma-topic-attachments-mapper";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TopicAttachmentFactory {

  constructor(private prismaService : PrismaService) {}

  async execute(topicAttachment: TopicAttachment[]) {
    const data = topicAttachment.map( i =>  new PrismaTopicAttachmentMapper().toPrisma(i))
    await this.prismaService.attachments.createMany({ data })
  }
}