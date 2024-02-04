import { AppModule } from "@/infra/app.module";
import { INestApplication } from "@nestjs/common";
import { UserFactory } from "test/e2e-factories/make-user";
import { makeUser } from "test/factories/make-user";
import { Test } from '@nestjs/testing';
import { DatabaseModule } from "@/infra/database/database.module";
import request from 'supertest';
import { TopicFactory } from "test/e2e-factories/make-topic";
import { makeTopic } from "test/factories/make-topic";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { makeTopicAttachment } from "test/factories/make-topic-attachment";
import { TopicAttachmentFactory } from "test/e2e-factories/make-topic-attachments";

describe('Delete Topic - E2E', () => {
  let app: INestApplication;

  let userFactory: UserFactory
  let topicFactory: TopicFactory
  let attachmentFactory: TopicAttachmentFactory
  let jwt: JwtService
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule,],
      providers: [UserFactory, TopicFactory, TopicAttachmentFactory]
    }).compile()
    app = moduleRef.createNestApplication();

    userFactory = moduleRef.get(UserFactory)
    topicFactory = moduleRef.get(TopicFactory)
    attachmentFactory = moduleRef.get(TopicAttachmentFactory)
    jwt = moduleRef.get(JwtService)
    prisma = moduleRef.get(PrismaService)

    await app.init();
  });

  test(`[DELETE] /topic/`, async () => {
    const user = makeUser()
    const topic = makeTopic({ authorId: user.id , content : 'topic-content' })

    await userFactory.execute(user)
    await topicFactory.execute(topic)

    const attachment1 = makeTopicAttachment({ topicId : topic.id })
    await attachmentFactory.execute([attachment1])

    const accessToken = jwt.sign({ sub: { value: user.id.toString() } })
    const response = await request(app.getHttpServer())
      .delete(`/topic/${topic.id}`)
      .set('Authorization', `Bearer ${accessToken}`)

    expect(response.statusCode).toBe(200)

    const topicOnDatabase = await prisma.topic.findFirst({
      where: {
        content: 'topic-content',
      },
    })

    expect(topicOnDatabase).toBeNull()

    const attachmentsOnDatabase = await prisma.attachments.findMany({
      where: {
        topic_id: topicOnDatabase?.id,
      },
    })

    expect(attachmentsOnDatabase).toHaveLength(0)
  })
})
