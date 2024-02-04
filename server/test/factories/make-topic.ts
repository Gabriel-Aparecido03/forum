import { faker } from '@faker-js/faker'
import { UniqueEntityID } from "../../src/domain/core/unique-entity-id"
import { Topic, TopicPropsType } from "../../src/domain/forum/enterprise/entities/topic"
import { Slug } from "../../src/domain/forum/enterprise/entities/value-objects/Slug"

export function makeTopic(
  override: Partial<TopicPropsType> = {},
  id?: UniqueEntityID,
) {
  const title = faker.lorem.sentence()
  const question = Topic.create(
    {
      authorId: new UniqueEntityID(),
      title,
      content: faker.lorem.text(),
      slug : Slug.create(title),
      ...override,
    },
    id,
  )

  return question
}