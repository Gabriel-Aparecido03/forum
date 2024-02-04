import { faker } from "@faker-js/faker"
import { UniqueEntityID } from "../../src/domain/core/unique-entity-id"
import { User, UserPropsType } from "../../src/domain/forum/enterprise/entities/user"

export function makeUser(
  override: Partial<UserPropsType> = {},
  id?: UniqueEntityID,
) {
  const user = User.create(
    {
      createdAt: new Date(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      updatedAt: new Date(),
      username: faker.internet.userName(),
      ...override,
    },
    id,
  )

  return user
}