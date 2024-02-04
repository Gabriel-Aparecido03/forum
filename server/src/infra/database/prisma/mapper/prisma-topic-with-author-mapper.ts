import { UniqueEntityID } from "@/domain/core/unique-entity-id";
import { Slug } from "@/domain/forum/enterprise/entities/value-objects/Slug";
import { TopicWithAuthor } from "@/domain/forum/enterprise/entities/value-objects/topic-with-author";

type User = {
  id: string;
  username: string;
  email: string;
  passoword: string;
  createdAt: Date;
  updatedAt: Date;
};

type Topic = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  user_id: string;
  content: string;
  title: string;
  slug: string;
}

interface RawType {
  user: User,
  id: string;
  createdAt: Date;
  updatedAt: Date;
  user_id: string;
  content: string;
  title: string;
  slug: string;
}


export class PrismaTopicWithAuthorMapper {
  toDomain(raw: RawType): TopicWithAuthor {
    if (!raw) return null
    return TopicWithAuthor.create({
      author : raw.user.username,
      authorId : new UniqueEntityID(raw.user.id),
      content : raw.content,
      createdAt : raw.createdAt,
      slug : Slug.createFromText(raw.slug),
      title : raw.title,
      updatedAt : raw.updatedAt,
      id : new UniqueEntityID(raw.id)
    })
  }
}