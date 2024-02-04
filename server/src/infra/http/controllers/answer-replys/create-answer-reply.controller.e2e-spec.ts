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

describe('Create Answer - E2E', () => {
  let app: INestApplication;

  let userFactory: UserFactory
  let topicFactory: TopicFactory
  let answerFactory: AnswerFactory
  let attachmentFactory: AttachmentFactory
  let jwt: JwtService
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule,],
      providers: [UserFactory, TopicFactory, AttachmentFactory,AnswerFactory]
    }).compile()
    app = moduleRef.createNestApplication();

    userFactory = moduleRef.get(UserFactory)
    topicFactory = moduleRef.get(TopicFactory)
    attachmentFactory = moduleRef.get(AttachmentFactory)
    answerFactory = moduleRef.get(AnswerFactory)
    jwt = moduleRef.get(JwtService)
    prisma = moduleRef.get(PrismaService)

    await app.init();
  });

  test(`[POST] /answer-reply/`, async () => {
    const user = makeUser()
    const topic = makeTopic({ authorId: user.id })
    const answer = makeAnswer({ authorId : user.id , topicId : topic.id })

    await userFactory.execute(user)
    await topicFactory.execute(topic)
    await answerFactory.execute(answer)

    const attachment1 = makeAttachment()
    await attachmentFactory.execute(attachment1)

    const accessToken = jwt.sign({ sub: { value : user.id.toString() } })
    const response = await request(app.getHttpServer())
      .post(`/answer-reply/`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        content: 'New answer',
        answerId: answer.id.toString(),
        attachmentsIds: [attachment1.id.toString()],
      })

    expect(response.statusCode).toBe(201)

    const answerReplyOnDatabase = await prisma.answerReply.findFirst({
      where: {
        content: 'New answer',
      },
    })

    expect(answerReplyOnDatabase).toBeTruthy()

    const attachmentsOnDatabase = await prisma.attachments.findMany({
      where: {
        answer_reply_id: answerReplyOnDatabase?.id,
      },
    })

    expect(attachmentsOnDatabase).toHaveLength(1)
  })
})
