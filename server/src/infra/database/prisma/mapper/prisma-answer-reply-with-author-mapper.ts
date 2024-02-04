import { UniqueEntityID } from "@/domain/core/unique-entity-id";
import { AnswerReplyWithAuthor } from "@/domain/forum/enterprise/entities/value-objects/answer-reply-with-author";

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
  answer_id: string;
}

export class PrismaAnswerReplyWithAuthorMapper {
  toDomain(raw: RawType): AnswerReplyWithAuthor {
    if (!raw) return null
    return AnswerReplyWithAuthor.create({
      author: raw.user.username,
      authorId: new UniqueEntityID(raw.user.id),
      content: raw.content,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      id: new UniqueEntityID(raw.id),
      answerId : new UniqueEntityID(raw.answer_id),
    })
  }
}