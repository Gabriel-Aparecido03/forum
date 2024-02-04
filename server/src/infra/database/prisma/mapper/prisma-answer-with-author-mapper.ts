import { UniqueEntityID } from "@/domain/core/unique-entity-id";
import { Slug } from "@/domain/forum/enterprise/entities/value-objects/Slug";
import { AnswerWithAuthor } from "@/domain/forum/enterprise/entities/value-objects/answer-with-author";

type User = {
  id: string;
  username: string;
  email: string;
  passoword: string;
  createdAt: Date;
  updatedAt: Date;
};

interface RawType {
  user: User,
  id: string;
  createdAt: Date;
  updatedAt: Date;
  user_id: string;
  content: string;
  topic_id: string;
}


export class PrismaAnswerWithAuthorMapper {
  toDomain(raw: RawType): AnswerWithAuthor {
    if (!raw) return null
    return AnswerWithAuthor.create({
      author: raw.user.username,
      authorId: new UniqueEntityID(raw.user.id),
      content: raw.content,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      id: new UniqueEntityID(raw.id),
      topicId : new UniqueEntityID(raw.topic_id),
    })
  }
}