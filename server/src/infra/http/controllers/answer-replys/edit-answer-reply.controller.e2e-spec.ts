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
import { AnswerReplyFactory } from "test/e2e-factories/make-answer-reply";
import { makeAnswerReply } from "test/factories/make-answer-reply";
import { makeAnswerReplyAttachment } from "test/factories/make-answer-reply-attachment";
import { AnswerReplyAttachmentFactory } from "test/e2e-factories/make-answer-reply-attachment";

describe('Edit Answer Reply - E2E', () => {
  let app: INestApplication;

  let userFactory: UserFactory
  let topicFactory: TopicFactory
  let answerFactory: AnswerFactory
  let answerAttachmentFactory: AnswerReplyAttachmentFactory
  let answerReplyFactory: AnswerReplyFactory
  let jwt: JwtService 
  let prisma: PrismaService
  let attachmentFactory: AttachmentFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule,],
      providers: [UserFactory, TopicFactory, AnswerReplyAttachmentFactory, AnswerFactory, AttachmentFactory, AnswerReplyFactory]
    }).compile()
    app = moduleRef.createNestApplication();

    userFactory = moduleRef.get(UserFactory)
    topicFactory = moduleRef.get(TopicFactory)
    answerFactory = moduleRef.get(AnswerFactory)
    answerAttachmentFactory = moduleRef.get(AnswerReplyAttachmentFactory)
    answerReplyFactory = moduleRef.get(AnswerReplyFactory)
    jwt = moduleRef.get(JwtService)
    attachmentFactory = moduleRef.get(AttachmentFactory)
    prisma = moduleRef.get(PrismaService)

    await app.init();
  });

  test(`[PUT] /answer-reply/`, async () => {
    const user = makeUser()
    const topic = makeTopic({ authorId: user.id })
    const answer = makeAnswer({ authorId: user.id, topicId: topic.id })
    const answerReply = makeAnswerReply({ authorId: user.id, answerId: answer.id })

    await userFactory.execute(user)
    await topicFactory.execute(topic)
    await answerFactory.execute(answer)
    await answerReplyFactory.execute(answerReply)

    const attachment1 = makeAnswerReplyAttachment({ answerReplyId: answerReply.id })
    const attachment2 = makeAnswerReplyAttachment({ answerReplyId: answerReply.id })
    await answerAttachmentFactory.execute([attachment1, attachment2])

    const attachment3 = makeAttachment()
    await attachmentFactory.execute(attachment3)

    const accessToken = jwt.sign({ sub: { value: user.id.toString() } })
    const response = await request(app.getHttpServer())
      .put(`/answer-reply/${answerReply.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        content: 'new-edited-content',
        attachmentsIds: [attachment1.attachmentId.toString(), attachment3.id.toString()]
      })

    expect(response.statusCode).toBe(204)

    const answerReplyOnDatabase = await prisma.answerReply.findFirst({
      where: {
        content: 'new-edited-content',
      },
    })
    expect(answerReplyOnDatabase).toBeTruthy()

    const attachmentsAtDatabase = await prisma.attachments.findMany({
      where: {
        answer_reply_id: answerReply.id.toString()
      },
    })
    expect(attachmentsAtDatabase).toHaveLength(2)

    const deletedAttachment = await prisma.attachments.findMany({
      where: {
        id: attachment2.id.toString()
      },
    })
    expect(deletedAttachment).toHaveLength(0)

    const newAddedAttachment = await prisma.attachments.findMany({
      where: {
        id: attachment3.id.toString(),
        answer_reply_id: answerReply.id.toString()
      },
    })
    expect(newAddedAttachment).toHaveLength(1)
  })
})
