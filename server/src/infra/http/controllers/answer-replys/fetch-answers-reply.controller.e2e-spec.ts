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
import { AnswerAttachmentFactory } from "test/e2e-factories/make-answer-attachment";
import { AnswerReplyFactory } from "test/e2e-factories/make-answer-reply";
import { makeAnswerReply } from "test/factories/make-answer-reply";

describe('Get Answer - E2E', () => {
  let app: INestApplication;

  let userFactory: UserFactory
  let topicFactory: TopicFactory
  let answerFactory: AnswerFactory
  let answerReplyFactory: AnswerReplyFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule,],
      providers: [UserFactory, TopicFactory, AnswerAttachmentFactory, AnswerFactory,AnswerReplyFactory]
    }).compile()
    app = moduleRef.createNestApplication();

    userFactory = moduleRef.get(UserFactory)
    topicFactory = moduleRef.get(TopicFactory)
    answerFactory = moduleRef.get(AnswerFactory)
    answerReplyFactory = moduleRef.get(AnswerReplyFactory)
    jwt = moduleRef.get(JwtService)

    await app.init();
  });

  test(`[GET] /answers/`, async () => {
    const user = makeUser()
    const topic = makeTopic({ authorId: user.id })

    await userFactory.execute(user)
    await topicFactory.execute(topic)

    const answer = makeAnswer({ authorId: user.id, topicId: topic.id })
    await answerFactory.execute(answer)

    for (let index = 0; index < 22; index++) {
      const answerReply = makeAnswerReply({ authorId: user.id, answerId: answer.id })
      await answerReplyFactory.execute(answerReply)
    }

    const accessToken = jwt.sign({ sub: { value: user.id.toString() } })
    const responseFirstPage = await request(app.getHttpServer())
      .get(`/answer-reply/?page=1&filter=recent`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        answerId: answer.id.toString()
      })

    expect(responseFirstPage.statusCode).toBe(200)
    expect(responseFirstPage.body).toHaveLength(20)
  })
})
