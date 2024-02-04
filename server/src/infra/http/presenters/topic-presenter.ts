import { Topic } from "@/domain/forum/enterprise/entities/topic"

export class TopicPresenter {
  static toHTTP(topic: Topic) {
    return {
      id: topic.id.toString(),
      title: topic.title,
      content: topic.content,
      authorId: topic.authorId.toString(),
      createdAt: topic.createdAt,
      updatedAt: topic.updatedAt,
      slug : topic.slug.value
    }
  }
}