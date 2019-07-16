import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import nock from 'nock';
import { ConfigService } from 'nestjs-config';

import { AppModule } from '../../src/app.module';
import { Book } from '../../src/books/schemas/types';

describe('Graphql Books (e2e)', () => {
  let app: INestApplication;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
    .compile();

    app = module.createNestApplication();
    configService = module.get<ConfigService>(ConfigService);
    await app.init();
  });

  afterEach(async () => {
    nock.cleanAll();
    await app.close();
  });

  describe('Query', () => {
    describe('books', () => {
      it('should return array of books', async () => {

        const stubGetBooksResult = {
          books: [
            {
              _id: '1',
              title: 'Title 1',
              userId: '1',
            },
          ],
          next: false,
        };

        nock(configService.get('app.microservices.bookServiceUrl'))
          .get('/books')
          .reply(200, stubGetBooksResult);

        const query = `
          query {
            books {
              _id
              title
            }
          }
        `;

        const result = {
          data: {
            books: [
              {
                _id: '1',
                title: 'Title 1',
              },
            ],
          },
        };

        const res = await request(app.getHttpServer())
          .post('/graphql')
          .send({ query });

        expect(res.status).toBe(200);
        expect(res.body).toMatchObject(result);
      });
    });
  });
});
