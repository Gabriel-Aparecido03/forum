import { Injectable } from "@nestjs/common";
import { TopicAttachment } from "@/domain/forum/enterprise/entities/topic-attachment";

@Injectable()
export abstract class TopicAttachmentRepository {
  abstract getByTopicId(topicId: string): Promise<TopicAttachment[] | null>
  abstract createMany(topics: TopicAttachment[]): Promise<void>
  abstract deleteMany(topics: TopicAttachment[]): Promise<void>
  abstract deleteManyByTopicId(topicId: string): Promise<void>
}