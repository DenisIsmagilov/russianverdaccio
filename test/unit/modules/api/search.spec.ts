import supertest from 'supertest';

import { HEADERS, HEADER_TYPE, HTTP_STATUS } from '@verdaccio/core';

import { createUser, initializeServer, publishVersionWithToken } from './_helper';

describe('search', () => {
  let app;
  beforeEach(async () => {
    app = await initializeServer('search.yaml');
  });

  describe('search authenticated', () => {
    test.each([['foo']])('should return a foo private package', async (pkg) => {
      const res = await createUser(app, 'test', 'test');
      await publishVersionWithToken(app, pkg, '1.0.0', res.body.token);
      // this should not be displayed as part of the search
      await publishVersionWithToken(app, 'private-auth', '1.0.0', res.body.token);
      const response = await supertest(app)
        .get(
          `/-/v1/search?text=${encodeURIComponent(
            pkg
          )}&size=2000&from=0&quality=1&popularity=0.1&maintenance=0.1`
        )
        .set(HEADERS.ACCEPT, HEADERS.JSON)
        .set(HEADER_TYPE.CONTENT_TYPE, HEADERS.JSON)
        .expect(HEADERS.CONTENT_TYPE, HEADERS.JSON_CHARSET)
        .expect(HTTP_STATUS.OK);
      expect(response.body.objects[0].package.name).toEqual('foo');
      expect(response.body.total).toEqual(1);
      expect(response.body.objects[0].score).toEqual({
        detail: { maintenance: 0, popularity: 1, quality: 1 },
        final: 1,
      });
    });

    test.each([['@scope/foo']])('should return a scoped foo private package', async (pkg) => {
      const res = await createUser(app, 'test', 'test');
      await publishVersionWithToken(app, pkg, '1.0.0', res.body.token);
      // this should not be displayed as part of the search
      await publishVersionWithToken(app, pkg, '1.0.0', res.body.token);
      const response = await supertest(app)
        .get(
          `/-/v1/search?text=${encodeURIComponent(
            pkg
          )}&size=2000&from=0&quality=1&popularity=0.1&maintenance=0.1`
        )
        .set(HEADERS.ACCEPT, HEADERS.JSON)
        .set(HEADER_TYPE.CONTENT_TYPE, HEADERS.JSON)
        .expect(HEADERS.CONTENT_TYPE, HEADERS.JSON_CHARSET)
        .expect(HTTP_STATUS.OK);
      expect(response.body.objects[0].package.name).toEqual(pkg);
      expect(response.body.total).toEqual(1);
      expect(response.body.objects[0].score).toEqual({
        detail: { maintenance: 0, popularity: 1, quality: 1 },
        final: 1,
      });
    });
  });
  describe('error handling', () => {
    test.todo('should able to abort the request');
  });
});
