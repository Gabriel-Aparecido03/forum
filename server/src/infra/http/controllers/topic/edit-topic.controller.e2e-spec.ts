import { AppModule } from "@/infra/app.module";
import { INestApplication } from "@nestjs/common";
import { UserFactory } from "test/e2e-factories/make-user";
import { makeUser } from "test/factories/make-user";
import { Test } from '@nestjs/testing';
import { DatabaseModule } from "@/infra/database/database.module";
import request from 'supertest';
import { TopicFactory } from "test/e2e-factories/make-topic";
import { makeTopic } from "test/factories/make-topic";
import { AttachmentFactory } from "test/e2e-factories/make-attachment";
import { makeAttachment } from "test/factories/make-attachment";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { TopicAttachmentFactory } from "test/e2e-factories/make-topic-attachments";
import { makeTopicAttachment } from "test/factories/make-topic-attachment";

describe('Edit Topic - E2E', () => {
  let app: INestApplication;

  let userFactory: UserFactory
  let topicFactory: TopicFactory
  let topicAttachmentFactory: TopicAttachmentFactory
  let jwt: JwtService
  let prisma: PrismaService
  let attachmentFactory: AttachmentFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule,],
      providers: [UserFactory, TopicFactory, TopicAttachmentFactory, AttachmentFactory]
    }).compile()
    app = moduleRef.createNestApplication();

    userFactory = moduleRef.get(UserFactory)
    topicFactory = moduleRef.get(TopicFactory)
    topicAttachmentFactory = moduleRef.get(TopicAttachmentFactory)
    jwt = moduleRef.get(JwtService)
    attachmentFactory = moduleRef.get(AttachmentFactory)
    prisma = moduleRef.get(PrismaService)

    await app.init();
  });

  test(`[PUT] /topic/`, async () => {
    const user = makeUser()
    const topic = makeTopic({ authorId: user.id })

    await userFactory.execute(user)
    await topicFactory.execute(topic)

    const attachment1 = makeTopicAttachment({ topicId : topic.id })
    const attachment2 = makeTopicAttachment({ topicId : topic.id })
    await topicAttachmentFactory.execute([attachment1,attachment2])

    const attachment3 = makeAttachment()
    await attachmentFactory.execute(attachment3)

    const accessToken = jwt.sign({ sub: { value: user.id.toString() } })
    const response = await request(app.getHttpServer())
      .put(`/topic/${topic.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        content : 'new-edited-content',
        attachmentsIds : [attachment1.attachmentId.toString(),attachment3.id.toString()],
        title : 'new-title-edited'
      })

    expect(response.statusCode).toBe(204)

    const topicOnDatabase = await prisma.topic.findFirst({
      where: {
        content: 'new-edited-content',
      },
    })
    expect(topicOnDatabase).toBeTruthy()

    const attachmentsAtDatabase = await prisma.attachments.findMany({
      where: {
        topic_id : topic.id.toString()
      },
    })
    expect(attachmentsAtDatabase).toHaveLength(2)

    const deletedAttachment = await prisma.attachments.findMany({
      where: {
        id : attachment2.id.toString()
      },
    })
    expect(deletedAttachment).toHaveLength(0)

    const newAddedAttachment = await prisma.attachments.findMany({
      where: {
        id : attachment3.id.toString(),
        topic_id : topic.id.toString()
      },
    })
    expect(newAddedAttachment).toHaveLength(1)
  })
})
