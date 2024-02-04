import { faker } from '@faker-js/faker'
import { UniqueEntityID } from "../../src/domain/core/unique-entity-id"
import { Answer, AnswerPropsType } from '../../src/domain/forum/enterprise/entities/answer'

export function makeAnswer(
  override: Partial<AnswerPropsType> = {},
  id?: UniqueEntityID,
) {
  const question = Answer.create(
    {
      authorId: new UniqueEntityID(),
      content: faker.lorem.text(),
      topicId : new UniqueEntityID(),
      ...override,
    },
    id,
  )

  return question
}