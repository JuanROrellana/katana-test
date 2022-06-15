import * as request from 'supertest';

import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from './../src/app.module';
import { INestApplication } from '@nestjs/common';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('v1/api/decks (POST)', () => {
    return request(app.getHttpServer()).post('/v1/api/decks').expect(400);
  });
});
