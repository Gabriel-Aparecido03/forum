import { faker } from '@faker-js/faker'
import { UniqueEntityID } from "../../src/domain/core/unique-entity-id"
import { AnswerReplyPropsType, AnswerReply } from '../../src/domain/forum/enterprise/entities/answer-reply'

export function makeAnswerReply(
  override: Partial<AnswerReplyPropsType> = {},
  id?: UniqueEntityID,
) {
  const question = AnswerReply.create(
    {
      authorId: new UniqueEntityID(),
      content: faker.lorem.text(),
      answerId : new UniqueEntityID(),
      ...override,
    },
    id,
  )

  return question
}