import { describe, test, after, beforeEach } from 'node:test';
import assert from 'node:assert';
import supertest from "supertest";
import app from "../app";
import pool from '../../db/pool';
import test_helper from './test_helper';

const api = supertest(app);
console.log(api);

beforeEach(async () => {
  await test_helper.clearUsers();
  for (const user of test_helper.defaultUsers) {
    await test_helper.insertUserToDb(user.username, user.password);
  }
});

void describe('GET requests', () => {
  void test('this is a test', () => {
    assert.strictEqual(1, 1);
  });
});

after(async () => {
  await pool.end();
});