import { beforeEach, test, after, describe } from 'node:test';
import assert from 'node:assert';
import supertest from 'supertest';
import app from '../app';
import pool from '../../db/pool';
import { AIGenerateStudyQuestionResponse } from '../types/types';

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
      });
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

      const aiResponse = response.body as AIGenerateStudyQuestionResponse;

    assert(Array.isArray(aiResponse.questions));
    assert.strictEqual(aiResponse.questions.length, 1);
    assert.strictEqual(aiResponse.questions[0].concept.length, 3);
  });
});

after(async () => {
  await pool.end();
});