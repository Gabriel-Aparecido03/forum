import { Injectable } from "@nestjs/common";
import { Topic } from "@/domain/forum/enterprise/entities/topic";
import { Slug } from "@/domain/forum/enterprise/entities/value-objects/Slug";
import { TopicWithAuthor } from "../../enterprise/entities/value-objects/topic-with-author";

export interface PaginationParams {
  page : number
}

@Injectable()
export abstract class TopicRepository { 
  abstract create(topic : Topic) : Promise<void>
  abstract delete(id : string ) : Promise<void>
  abstract updated(topic : Topic) : Promise<void>
  abstract getBySlug(slug : Slug) : Promise<TopicWithAuthor | null>
  abstract getById(id : string ) : Promise<Topic | null>
  abstract fetchTopic(params : PaginationParams) : Promise<TopicWithAuthor[]>
}