import { beforeEach, test, after, describe } from 'node:test';
import assert from 'node:assert';
import supertest from 'supertest';
import app from '../app';
import pool from '../../db/pool';

// const api = supertest(app);

const loginUrl = '/api/login';
const baseUrl = '/api/assistant';

void describe('POST Request to AI', () => {
  const agent = supertest.agent(app);
  beforeEach(async () => {
    await agent
      .post(loginUrl)
      .send({
        username: 'default',
        password: 'password123',
      })
      .expect(201);
  });

  void test('requests to /api/assistant returns status 201', async () => {
    const response = await agent
      .post(baseUrl)
      .send({
        concepts: [
          {
            id: 20,
            note: "python methods",
            topic: "I learned how to use .zip() method to tie several lists together",
          }
        ]
      })
      .expect(201);

    console.log(response.body);

    assert.strictEqual(1, 1);
  });
});

after(async () => {
  await pool.end();
});