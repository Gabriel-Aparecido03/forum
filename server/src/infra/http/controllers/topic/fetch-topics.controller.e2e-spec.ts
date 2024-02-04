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
import { AnswerFactory } from "test/e2e-factories/make-answer";
import { AnswerAttachmentFactory } from "test/e2e-factories/make-answer-attachment";

describe('Get Topics - E2E', () => {
  let app: INestApplication;

  let userFactory: UserFactory
  let topicFactory: TopicFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule,],
      providers: [UserFactory, TopicFactory, AnswerAttachmentFactory, AnswerFactory]
    }).compile()
    app = moduleRef.createNestApplication();

    userFactory = moduleRef.get(UserFactory)
    topicFactory = moduleRef.get(TopicFactory)
    jwt = moduleRef.get(JwtService)

    await app.init();
  });

  test(`[GET] /topics/`, async () => {
    const user = makeUser()

    await userFactory.execute(user)

    for (let index = 0; index < 22; index++) {
      const topic = makeTopic({ authorId: user.id })
      await topicFactory.execute(topic)
    }

    const accessToken = jwt.sign({ sub: { value: user.id.toString() } })
    const responseFirstPage = await request(app.getHttpServer())
      .get(`/topics/?page=1&filter=recent`)
      .set('Authorization', `Bearer ${accessToken}`)


    expect(responseFirstPage.statusCode).toBe(200)
    expect(responseFirstPage.body).toHaveLength(20)
  })
})
