import { PaginationParams } from "../../src/domain/forum/application/repositories/answer-repository";
import { TopicRepository } from "../../src/domain/forum/application/repositories/topic-repository";
import { Topic } from "../../src/domain/forum/enterprise/entities/topic";
import { Slug } from "../../src/domain/forum/enterprise/entities/value-objects/Slug";

export class InMemoryTopicRepository extends TopicRepository {

  public items : Topic[] = []

  async create(topic: Topic): Promise<void> {
    this.items.push(topic)
  }

  async delete(id: string): Promise<void> {
    const result = this.items.filter( item => item.id.toString() !== id )
    this.items = result
  }

  async updated(topic: Topic): Promise<void> {
    const findIndex = this.items.findIndex(item => item.id.toString() === topic.id.toString() )
    this.items[findIndex] = topic
  }

  async getBySlug(slug: Slug): Promise<Topic | null> {
    const item = this.items.find(item => item.slug.value === slug.value )
    return item ?? null
  }

  async getById(id: string): Promise<Topic | null> {
    const item = this.items.find(item => item.id.toString() === id )
    return item ?? null
  }

  async fetchTopic({ page }: PaginationParams): Promise<Topic[]> {
    let topics = this.items
    return topics.slice((page - 1) * 20, page * 20 )
  }
}