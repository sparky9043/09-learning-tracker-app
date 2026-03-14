import { beforeEach, test, after, describe } from 'node:test';
import assert from 'node:assert';
import supertest from 'supertest';
import app from '../app';
import pool from '../../db/pool';

// const api = supertest(app);

const loginUrl = '/api/login';

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

  void test('', () => {
    assert.strictEqual(1, 1);
  });
});

after(async () => {
  await pool.end();
});