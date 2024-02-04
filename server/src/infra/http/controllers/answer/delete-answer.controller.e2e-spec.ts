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

describe('Delete Answer - E2E', () => {
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

  test(`[DELETE] /answer/`, async () => {
    const user = makeUser()
    const topic = makeTopic({ authorId: user.id })
    const answer = makeAnswer({ authorId: user.id, topicId: topic.id })

    await userFactory.execute(user)
    await topicFactory.execute(topic)
    await answerFactory.execute(answer)

    const attachment1 = makeAnswerAttachment({ answerId : answer.id })
    await attachmentFactory.execute([attachment1])

    const accessToken = jwt.sign({ sub: { value: user.id.toString() } })
    const response = await request(app.getHttpServer())
      .delete(`/answer/${answer.id}`)
      .set('Authorization', `Bearer ${accessToken}`)

    expect(response.statusCode).toBe(200)

    const answerOnDatabase = await prisma.answer.findFirst({
      where: {
        content: 'New answer',
      },
    })

    expect(answerOnDatabase).toBeNull()

    const attachmentsOnDatabase = await prisma.attachments.findMany({
      where: {
        answer_id: answerOnDatabase?.id,
      },
    })

    expect(attachmentsOnDatabase).toHaveLength(0)
  })
})
