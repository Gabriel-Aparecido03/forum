import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '@/infra/app.module';

describe('Register User - E2E', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports : [AppModule],
    }).compile()
    app = moduleRef.createNestApplication();
    await app.init();
  });

  test(`[POST] /session/authenticate`, async () => {

    const response = await request(app.getHttpServer()).post('/session/register').send({
      email : 'johndoe@email.com',
      password : 'johndoe',
      username : 'johndoe'
    })

    expect(response.statusCode).toEqual(201)
  })
})
