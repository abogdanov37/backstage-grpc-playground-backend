/*
 * Copyright 2020 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { DatabaseManager, getVoidLogger, PluginDatabaseManager, UrlReader } from '@backstage/backend-common';
import { ConfigReader } from '@backstage/config';
import { ScmIntegrationRegistry } from '@backstage/integration';
import express from 'express';
import request from 'supertest';

import { createRouter } from './router';

function createDatabase(): PluginDatabaseManager {
  return DatabaseManager.fromConfig(
    new ConfigReader({
      backend: {
        database: {
          client: 'better-sqlite3',
          connection: ':memory:',
        },
      },
    }),
  ).forPlugin('backstage-grpc-playground-backend');
}

describe('createRouter', () => {
  let app: express.Express;

  beforeAll(async () => {
    const reader: jest.Mocked<UrlReader> = { readUrl: jest.fn(), readTree: jest.fn(), search: jest.fn() };

    const router = await createRouter({
      logger: getVoidLogger(),
      reader,
      database: createDatabase(),
      integrations: {} as unknown as ScmIntegrationRegistry,
    });

    app = express().use(router);
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('GET /health', () => {
    it('returns ok', async () => {
      const response = await request(app).get('/health');

      expect(response.status).toEqual(200);
      expect(response.body).toEqual({ status: 'ok' });
    });
  });
});
