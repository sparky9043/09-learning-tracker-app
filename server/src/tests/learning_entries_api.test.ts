import { test, after, beforeEach, describe } from 'node:test';
import assert from 'node:assert';
import supertest from 'supertest';
import app from '../app';
import pool from '../../db/pool';
import test_helper from './test_helper';
import { LearningEntry, NewLearningEntry } from '../types/types';

const api = supertest(app);
// const server = supertest.agent('http://localhost:3000');

const loginUrl = '/api/login';
const entriesUrl = '/api/entries';

beforeEach(async () => {
  await test_helper.clearUsers();
  await test_helper.clearEntries();
  for (const user of test_helper.defaultUsers) {
    await test_helper.insertUserToDb(user.username, user.password);
  }
  for (const entry of test_helper.defaultEntries) {
    await test_helper.insertEntriesIntoDb(entry as NewLearningEntry);
  }
});

void describe('GET Requests', () => {
  void test('/api/entries returns learning entries', async () => {
    const result = await api
      .get(entriesUrl)
      .expect(200)
      .expect('Content-Type', /application\/json/);
      
      assert.ok(Array.isArray(result.body));
      assert.strictEqual(result.body.length, test_helper.defaultEntries.length);
      
      const topics = result.body.map(e => (e as LearningEntry).topic);
      assert(topics.includes(test_helper.defaultEntries[0].topic));
    });
    
    void test('/api/entries/:id returns one learning entry by id', async () => {
      const result = await api
        .get(`${entriesUrl}/1`)
        .expect(200)
        .expect('Content-Type', /application\/json/);
    
    assert.ok(typeof result.body === 'object');
    assert.strictEqual((result.body as LearningEntry).topic, test_helper.defaultEntries[0].topic);
  });

  void test('/api/entries/loggedin returns 302 if userid is valid but user not logged in', async () => {
    await api
      .get('/api/entries/loggedin')
      .expect(302);
  });
});

void describe('AFTER User Logs In', () => {
  // persist login cookies by calling supertest agent instead of regular supertest
  const agent = supertest.agent(app);
  beforeEach(async () => {
    await agent
      .post(loginUrl)
      .send({ username: 'default', password: 'password123' })
      .expect(201);
  });

  void test('GET /api/entries/loggedin status 200 and returns all entries by user', async () => {
    const response = await agent
      .get('/api/entries/loggedin')
      .expect(200);

    const userId = (response.body as LearningEntry[])[0].user_id;
    const defaultLearningEntries = test_helper.defaultEntries.filter(e => e.user_id === userId);

    assert.ok(Array.isArray(response.body));
    assert.strictEqual(defaultLearningEntries.length, response.body.length);
  });
  
  void test('POST /api/entries status 201 and returns the created entry', async () => {
    
    const newEntryObject = {
      user_id: 1,
      topic: "authentication",
      note: "learned how to make authentication using passport js",
      difficulty: 3,
      minutes_spent: 120
    };

    const entriesAtStart = await test_helper.getEntriesInDb(newEntryObject.user_id);

    const response = await agent
      .post(`${entriesUrl}/loggedin`)
      .send(newEntryObject)
      .expect(201)
      .expect('Content-Type', /application\/json/);
    
    const entriesAtEnd = await test_helper.getEntriesInDb(newEntryObject.user_id);

    const learningEntry = (response.body as LearningEntry);

    assert.strictEqual(learningEntry.note, newEntryObject.note);
    assert.strictEqual(entriesAtEnd.length, entriesAtStart.length + 1);
  });

  void test('DELETE /api/entries/loggedin/:id returns 200 and status success', async () => {
    const userId = 1;
    const entriesAtStart = await test_helper.getEntriesInDb(userId);
    const entryId = 5;

    await agent
      .delete(`${entriesUrl}/loggedin/${entryId}`)
      .expect(200);
    
    const entriesAtEnd = await test_helper.getEntriesInDb(userId);

    assert.strictEqual(entriesAtEnd.length, entriesAtStart.length - 1);
  });

  void test('PUT /api/entries/loggedin/:id returns 200 and status success', async () => {
    const user_id = 1;
    const entryId = 1;

    // updatedEntry doesn't have note and difficulty
    const updatedEntry = {
      user_id,
      topic: 'Django',
      minutes_spent: 30,
    };

    await agent
      .put(`${entriesUrl}/loggedin/${entryId}`)
      .send(updatedEntry)
      .expect(200);
  });

  after(async () => {
    await agent.post('/api/logout');
  });
});

after(async () => {
  await test_helper.clearUsers();
  await test_helper.clearEntries();
  for (const user of test_helper.defaultUsers) {
    await test_helper.insertUserToDb(user.username, user.password);
  }
  for (const entry of test_helper.defaultEntries) {
    await test_helper.insertEntriesIntoDb(entry as NewLearningEntry);
  }
  await pool.end();
});