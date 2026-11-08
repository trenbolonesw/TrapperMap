import { afterAll, beforeAll, expect, test } from 'vitest';
import type { FastifyInstance } from 'fastify';
import { initTestApp } from './utils.js';

let app: FastifyInstance;

beforeAll(async () => {
  // use different ports to allow parallel testing
  app = await initTestApp(30001);
});

afterAll(async () => {
  // we close only the fastify app - it will close the database connection via onClose hook automatically
  await app.close();
});

test('list all markers', async () => {
  // mimic the http request via `app.inject()`
  const res = await app.inject({
    method: 'get',
    url: '/traps',
  });

  // assert it was successful response
  expect(res.statusCode).toBe(200);

  // with expected shape
  expect(res.json()).toMatchObject({
    items: [
        {trapCategory:'connibear', isChecked:false,latitude:11,longitude:10.8888833}
    ],
    total: 1,
  });
});