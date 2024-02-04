import { AppModule } from "@/infra/app.module";
import { INestApplication } from "@nestjs/common";
import { UserFactory } from "test/e2e-factories/make-user";
import { makeUser } from "test/factories/make-user";
import { Test } from '@nestjs/testing';
import { DatabaseModule } from "@/infra/database/database.module";
import request from 'supertest';
import { TopicFactory } from "test/e2e-factories/make-topic";
import { AttachmentFactory } from "test/e2e-factories/make-attachment";
import { makeAttachment } from "test/factories/make-attachment";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "@/infra/database/prisma/prisma.service";

describe('Create Topic - E2E', () => {
  let app: INestApplication;

  let userFactory: UserFactory
  let topicFactory: TopicFactory
  let attachmentFactory: AttachmentFactory
  let jwt: JwtService
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule,],
      providers: [UserFactory, TopicFactory, AttachmentFactory]
    }).compile()
    app = moduleRef.createNestApplication();

    userFactory = moduleRef.get(UserFactory)
    topicFactory = moduleRef.get(TopicFactory)
    attachmentFactory = moduleRef.get(AttachmentFactory)
    jwt = moduleRef.get(JwtService)
    prisma = moduleRef.get(PrismaService)

    await app.init();
  });

  test(`[POST] /topic/`, async () => {
    const user = makeUser()
    await userFactory.execute(user)

    const attachment1 = makeAttachment()
    await attachmentFactory.execute(attachment1)

    const accessToken = jwt.sign({ sub: { value : user.id.toString() } })
    const response = await request(app.getHttpServer())
      .post(`/topic/`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        content: 'new content',
        title: 'new-title',
        attachmentsIds: [attachment1.id.toString()],
      })

    expect(response.statusCode).toBe(201)

    const topicOnDatabase = await prisma.topic.findFirst({
      where: {
        title: 'new-title',
      },
    })

    expect(topicOnDatabase).toBeTruthy()

    const attachmentsOnDatabase = await prisma.attachments.findMany({
      where: {
        topic_id: topicOnDatabase?.id,
      },
    })

    expect(attachmentsOnDatabase).toHaveLength(1)
  })
})
