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
  user : User,
  topic : Topic
}

export class TopicWithAuthorPresenter {
  static toHTTP(topic: TopicWithAuthor) {
    return {
      id: topic.id.toString(),
      title: topic.title,
      content: topic.content,
      authorId: topic.authorId.toString(),
      createdAt: topic.createdAt,
      updatedAt: topic.updatedAt,
      slug : topic.slug.value,
      author : topic.author
    }
  }
}