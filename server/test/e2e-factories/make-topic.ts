import { Topic } from "@/domain/forum/enterprise/entities/topic";
import { PrismaTopicMapper } from "@/infra/database/prisma/mapper/prisma-topic-mapper";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TopicFactory {

  constructor(private prismaService : PrismaService) {}

  async execute(topic: Topic) {
    const data = new PrismaTopicMapper().toPrisma(topic)

    await this.prismaService.topic.create({ data })
  }
}