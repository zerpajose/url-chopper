import { describe, it, mock } from "node:test";
import assert from "node:assert";
import request from 'supertest';
import express from 'express';
import router from '../../src/routes/short-url.route';
import * as urlService from '../../src/services/url.service';
import { getShortUrl } from '../../src/services/url.service';
// import {  } from '../../src/validations/url-service.shemas';

// describe("formatFileSize function", () => {
//   it('should return "1.00 GB" for sizeBytes = 1073741824', () => {
//     assert.strictEqual(formatFileSize(1073741824), "1.00 GB");
//   });
// });
const app = express();
app.use(express.json());
app.use('/short-url', router);

describe("GET /api/shorten/:shortCode", () => {
  it("should update the short URL successfully", async (context) => {
    const shortCode = 'abc123';

    // const calcSomeValue = mock.module('../../src/services/url.service.ts', { namedExports: ['getShortUrl'] });
    // calcSomeValue.mockImplementation(function mock__calcSomeValue() { return null });

    const urlMock = context.mock.fn(urlService.getShortUrl, () => {
      return {
        id: '123',
        url: 'https://example.com',
        shortCode: 'abc123',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        accessCount: 0,
      };
    });
    // urlMock.mock.mockImplementation(async () => {
    //   return {
    //     id: '123',
    //     url: 'https://example.com',
    //     shortCode: 'abc123',
    //     createdAt: new Date().toISOString(),
    //     updatedAt: new Date().toISOString(),
    //     accessCount: 0,
    //   };
    // });

    // mock.method(urlService, 'getShortUrl', async () => {
    //   return {
    //     id: '123',
    //     url: 'https://example.com',
    //     shortCode: 'abc123',
    //     createdAt: new Date().toISOString(),
    //     updatedAt: new Date().toISOString(),
    //     accessCount: 0,
    //   };
    // });

    // updateShortUrl.mockResolvedValue({ shortCode, url: newUrl });

    const response = await request(app)
      .get(`/short-url/${shortCode}`);
    console.log('*******', response.body);
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.url, 'https://example.com');
  });
  
  // it("should update the short URL successfully", async () => {
  //   const shortCode = 'abc123';
  //   const newUrl = 'https://newurl.com';

  //   mock.method(urlService, 'getShortUrl', () => {
  //     return {
  //       id: '123',
  //       url: 'https://example.com',
  //       shortCode: 'abc123',
  //       createdAt: new Date().toISOString(),
  //       updatedAt: new Date().toISOString(),
  //       accessCount: 0,
  //     };
  //   });

  //   updateShortUrl.mockResolvedValue({ shortCode, url: newUrl });

  //   const response = await request(app)
  //     .put(`/short-url/${shortCode}`)
  //     .send({ url: newUrl });

  //   assert.strictEqual(response.status, 200);
  //   assert.strictEqual(response.body.url, newUrl);
  // });

  // it("should return 400 for invalid data", async () => {
  //   const shortCode = 'abc123';
  //   const invalidUrl = 'invalid-url';

  //   updateShortUrlSchema.parse.mockImplementation(() => {
  //     throw new Error('Invalid URL');
  //   });

  //   const response = await request(app)
  //     .put(`/short-url/${shortCode}`)
  //     .send({ url: invalidUrl });

  //   assert.strictEqual(response.status, 400);
  //   assert.strictEqual(response.text, 'Invalid URL');
  // });

  // it("should return 404 for non-existing short code", async () => {
  //   const shortCode = 'nonexistent';
  //   const newUrl = 'https://newurl.com';

  //   updateShortUrl.mockImplementation(() => {
  //     throw new Error('Short code not found');
  //   });

  //   const response = await request(app)
  //     .put(`/short-url/${shortCode}`)
  //     .send({ url: newUrl });

  //   assert.strictEqual(response.status, 404);
  //   assert.strictEqual(response.text, 'Short code not found');
  // });
});
