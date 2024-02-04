import { Injectable } from "@nestjs/common";
import { TopicRepository } from "../repositories/topic-repository";
import { UserRepostiory } from "../repositories/user-repository";
import { Topic } from "../../enterprise/entities/topic";
import { User } from "../../enterprise/entities/user";

interface FetchTopicParams {
  page: number
}

interface TopicsPresenter {
  topic : Topic,
  user : User
}

@Injectable()
export class FetchTopicsUseCase {
  constructor(private topicsRepository: TopicRepository, private usersRepository: UserRepostiory) { }

  async execute({ page }: FetchTopicParams) {
    const topics = await this.topicsRepository.fetchTopic({ page })
    return { topics } 
  }
}