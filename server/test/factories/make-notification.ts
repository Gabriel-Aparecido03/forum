import { faker } from "@faker-js/faker"
import { UniqueEntityID } from "../../src/domain/core/unique-entity-id"
import { Notification, NotificationProps } from "../../src/domain/notification/enterprise/entities/notification"

export function makeNotification(
  override: Partial<NotificationProps> = {},
  id?: UniqueEntityID,
) {
  const notification = Notification.create(
    {
      content : faker.lorem.paragraph(40),
      recipientId : new UniqueEntityID(),
      title : faker.lorem.sentence(20),
      ...override,
    },
    id,
  )

  return notification
}