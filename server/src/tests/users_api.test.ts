import { describe, test, after, beforeEach } from 'node:test';
import assert from 'node:assert';
import supertest from "supertest";
import app from "../app";
import pool from '../../db/pool';
import test_helper from './test_helper';
import { SavedUser } from '../types/types';

const api = supertest(app);

const baseUrl = '/api/users';

beforeEach(async () => {
  await test_helper.clearUsers();
  for (const user of test_helper.defaultUsers) {
    await test_helper.insertUserToDb(user.username, user.password);
  }
});

void describe('GET Requests', () => {
  void test('/api/users returns default users', async () => {
    const response = await api
      .get(baseUrl)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    
    assert.ok(Array.isArray(response.body));
    assert.strictEqual(response.body.length, test_helper.defaultUsers.length);

    const usernames = (response.body as SavedUser[]).map(u => u.username);
    assert(usernames.includes(test_helper.defaultUsers[0].username));
    assert(usernames.includes(test_helper.defaultUsers[1].username));
  });

  void test('/api/users/id returns one user by id', async () => {
    const response = await api
      .get(`${baseUrl}/1`)
      .expect(200);

    assert(Object.keys(response.body as SavedUser).includes('username'));
    assert.strictEqual(test_helper.defaultUsers[0].username, (response.body as SavedUser)?.username);
    assert.strictEqual(1, 1);
  });

  void test('/api/users/id throws error if id is invalid', async () => {
    const invalidId = 'invalid';

    const response = await api
      .get(`${baseUrl}/${invalidId}`)
      .expect(400);
    
    assert((response.body as Error).message.includes('invalid'));
  });

  void test('/api/users/id throws error if id is valid but nonexistent', async () => {
    const nonExistent = 9000;

    const response = await api
      .get(`${baseUrl}/${nonExistent}`)
      .expect(404);
    
    assert((response.body as Error).message.includes('not found'));
  });

});

void describe('POST Requests', () => {
  void test('/api/users creates new user with proper object', async () => {
    const usersAtStart = await test_helper.getUsersInDb();
    
    const newUserEntry = {
      username: 'huggies',
      password: 'bears123',
    };

    const response = await api
      .post(baseUrl)
      .send(newUserEntry)
      .expect(201);
    
    const usersAtEnd = await test_helper.getUsersInDb();

    assert(usersAtEnd.map(u => u.username).includes(newUserEntry.username));
    assert.strictEqual((response.body as SavedUser).username, newUserEntry.username);
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);
  });

  void test('/api/users throws error if username or password is missing', async () => {
    const usersAtStart = await test_helper.getUsersInDb();

    const badUsers = [
      {
        username: 'baduser1', // no password
      },
      {
        password: 'baduser2', // no username
      },
    ];

    for (const user of badUsers) {
      const response = await api
        .post(baseUrl)
        .send(user)
        .expect(400);

      assert.ok(typeof response.body === 'object');
      assert.strictEqual(response.type, 'application/json');
    }

    const usersAtEnd = await test_helper.getUsersInDb();
    
    // users array doesn't change in length
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });

});

after(async () => {
  await pool.end();
});