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
import { AnswerFactory } from "test/e2e-factories/make-answer";
import { makeAnswer } from "test/factories/make-answer";
import { makeAnswerAttachment } from "test/factories/make-answer-attachment";
import { AnswerAttachmentFactory } from "test/e2e-factories/make-answer-attachment";

describe('Get Answer - E2E', () => {
  let app: INestApplication;

  let userFactory: UserFactory
  let topicFactory: TopicFactory
  let answerFactory: AnswerFactory
  let attachmentFactory: AnswerAttachmentFactory
  let jwt: JwtService
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule,],
      providers: [UserFactory, TopicFactory, AnswerAttachmentFactory, AnswerFactory]
    }).compile()
    app = moduleRef.createNestApplication();

    userFactory = moduleRef.get(UserFactory)
    topicFactory = moduleRef.get(TopicFactory)
    answerFactory = moduleRef.get(AnswerFactory)
    attachmentFactory = moduleRef.get(AnswerAttachmentFactory)
    jwt = moduleRef.get(JwtService)
    prisma = moduleRef.get(PrismaService)

    await app.init();
  });

  test(`[GET] /answers/`, async () => {
    const user = makeUser()
    const topic = makeTopic({ authorId: user.id })

    await userFactory.execute(user)
    await topicFactory.execute(topic)

    for (let index = 0; index < 22; index++) {
      const answer = makeAnswer({ authorId: user.id, topicId: topic.id })
      await answerFactory.execute(answer)
    }

    const accessToken = jwt.sign({ sub: { value: user.id.toString() } })
    const responseFirstPage = await request(app.getHttpServer())
      .get(`/answers/?page=1&filter=recent`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        topicId: topic.id.toString()
      })

    expect(responseFirstPage.statusCode).toBe(200)
    expect(responseFirstPage.body).toHaveLength(20)
  })
})
