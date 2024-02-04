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
import { AnswerFactory } from "test/e2e-factories/make-answer";
import { makeAnswer } from "test/factories/make-answer";

describe('Fetch Notifications - E2E', () => {
  let app: INestApplication;

  let userFactory: UserFactory
  let topicFactory: TopicFactory
  let attachmentFactory: AttachmentFactory
  let jwt: JwtService
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule,],
      providers: [UserFactory, TopicFactory, AttachmentFactory, AnswerFactory]
    }).compile()
    app = moduleRef.createNestApplication();

    userFactory = moduleRef.get(UserFactory)
    topicFactory = moduleRef.get(TopicFactory)
    attachmentFactory = moduleRef.get(AttachmentFactory)
    jwt = moduleRef.get(JwtService)
    prisma = moduleRef.get(PrismaService)

    await app.init();
  });

  test(`[GET] /notifications/:notificationId`, async () => {
    const user = makeUser()
    const topic = makeTopic({ authorId: user.id })

    await userFactory.execute(user)
    await topicFactory.execute(topic)

    const attachment1 = makeAttachment()
    await attachmentFactory.execute(attachment1)

    const accessToken = jwt.sign({ sub: { value: user.id.toString() } })

    await request(app.getHttpServer())
      .post(`/answer/`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        content: 'New answer',
        topicId: topic.id.toString(),
        attachmentsIds: [],
      })

    const { id } = await prisma.notification.findFirst({
      where: {
        user_id: user.id.toString(),
      },
    })

    const response = await request(app.getHttpServer())
      .get(`/notifications/${id}`)
      .set('Authorization', `Bearer ${accessToken}`)


    expect(response.statusCode).toBe(200)

    const answerOnDatabase = await prisma.notification.findFirst({
      where: {
        user_id: user.id.toString(),
      },
    })

    expect(answerOnDatabase.readAt).toBeTruthy()
  })
})
