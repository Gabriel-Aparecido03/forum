import { TopicAttachmentRepository ,  } from "@/domain/forum/application/repositories/topic-attachment-repository"
import { TopicRepository ,PaginationParams } from "@/domain/forum/application/repositories/topic-repository"
import { Slug } from "@/domain/forum/enterprise/entities/value-objects/Slug"
import { Injectable } from "@nestjs/common"
import { PrismaTopicMapper } from "../mapper/prisma-topic-mapper"
import { PrismaService } from "../prisma.service"
import { Topic } from "@/domain/forum/enterprise/entities/topic"
import { PrismaTopicWithAuthorMapper } from "../mapper/prisma-topic-with-author-mapper"
import { TopicWithAuthor } from "@/domain/forum/enterprise/entities/value-objects/topic-with-author"

@Injectable()
export class PrismaTopicRepository implements TopicRepository {

  constructor(private prismaService: PrismaService, private attachmentsTopicRepository: TopicAttachmentRepository) { }
  async create(topic: Topic): Promise<void> {
    const data = new PrismaTopicMapper().toPrisma(topic)
    await this.prismaService.topic.create({ data })
  }

  async delete(id: string): Promise<void> {
    await this.attachmentsTopicRepository.deleteManyByTopicId(id)
    await this.prismaService.topic.delete({
      where: {
        id
      }
    })
  }

  async updated(topic: Topic): Promise<void> {
    const data = new PrismaTopicMapper().toPrisma(topic)
    await this.prismaService.topic.update({
      where: {
        id: data.id
      },
      data
    })
  }

  async getBySlug(slug: Slug): Promise<TopicWithAuthor> {
    const result = await this.prismaService.topic.findUnique({
      where: {
        slug: slug.value
      },
      include: {
        user : true
      }
    })

    return new PrismaTopicWithAuthorMapper().toDomain(result)
  }

  async getById(id: string): Promise<Topic> {
    const result = await this.prismaService.topic.findUnique({
      where: {
        id: id.toString()
      },
      include: {
        Attachments: {
          select: {
            id: true
          }
        },
        ItsRelavant: {
          select: {
            user_id: true
          }
        },
        ItsNotRelevant: {
          select: {
            user_id: true
          }
        }
      }
    })

    return new PrismaTopicMapper().toDomain(result)
  }

  async fetchTopic({  page }: PaginationParams): Promise<TopicWithAuthor[]> {
    
    const result = await this.prismaService.topic.findMany({
      take: 20,
      skip: (page - 1) * 20,
      orderBy: {
        createdAt: 'desc'
      },
      include : {
        user : true
      }
    })

    return result.map(item => new PrismaTopicWithAuthorMapper().toDomain(item))
  }

}