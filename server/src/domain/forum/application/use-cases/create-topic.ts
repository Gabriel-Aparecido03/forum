import { InvalidCredentialsError } from "@/domain/core/errors/invalid-credentials";
import { HashComparer } from "../cryptography/hash-comparer";
import { UserRepostiory } from "../repositories/user-repository";
import { Encrypter } from "../cryptography/encrypter";
import { Injectable } from "@nestjs/common";
import { TopicRepository } from "../repositories/topic-repository";
import { Topic } from "../../enterprise/entities/topic";
import { Slug } from "../../enterprise/entities/value-objects/Slug";

interface CreateTopicParams {
  content: string
  title: string
  authorId: string
}

@Injectable()
export class CreateTopicUseCase {
  constructor(private topicsRepository: TopicRepository, private usersRepository: UserRepostiory) { }

  async execute({ authorId, content, title }: CreateTopicParams) {
    const user = await this.usersRepository.getById(authorId)
    if (!user) throw new InvalidCredentialsError()

    const slug = Slug.createFromText(title)

    const topic = Topic.create({
      authorId : user.id,
      content,
      slug,
      title
    })

    await this.topicsRepository.create(topic)
  }
}