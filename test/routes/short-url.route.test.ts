import { afterEach, expect, it, describe, vi, beforeEach } from 'vitest'
import request from 'supertest';
import express from 'express';
import router from '../../src/routes/short-url.route';
import { authenticateToken } from '../../src/services/auth.service';
import * as urlService from '../../src/services/url.service';

const app = express();
app.use(express.json());
app.use('/api/shorten', router);

describe("/api/shorten", () => {
  beforeEach(() => {
    vi.mock('../../src/services/auth.service', () => ({
      authenticateToken: vi.fn((req, res, next) => next()),
    }));
  });

  afterEach(() => {
    expect(authenticateToken).toHaveBeenCalled();
    vi.restoreAllMocks();
  });

  describe("GET /:shortCode", () => {
    it("[ERROR] document not found", async () => {
      const shortCode = 'abc123';
    
      const response = await request(app)
        .get(`/api/shorten/${shortCode}`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Short URL not found');
    });

    it("[SUCCESS] should get the document successfully", async () => {
      const shortCode = 'abc123';

      const getShortUrlMock = vi.spyOn(urlService, 'getShortUrl');

      getShortUrlMock.mockResolvedValue({
        id: '123',
        url: 'https://example.com',
        shortCode: 'abc123',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        accessCount: undefined,
      });
    
      const response = await request(app)
        .get(`/api/shorten/${shortCode}`);
      
      expect(response.status).toBe(200);
      expect(response.body.url).toBe('https://example.com');
    });
  });

  describe("POST /", () => {
    it("[ERROR] should return 400 for invalid url", async () => {
      const invalidPaylod = { url: 'invalid-url' };

      const response = await request(app)
        .post(`/api/shorten`)
        .send(invalidPaylod);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('url Invalid url');
    });

    it("[SUCCESS] should create the document successfully", async () => {
      const requestPayload = { url: 'https://example.com' };

      const createShortUrlMock = vi.spyOn(urlService, 'createShortUrl');

      createShortUrlMock.mockResolvedValue({
        id: '123',
        url: 'https://example.com',
        shortCode: 'abc123',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        accessCount: 0,
      });
    
      const response = await request(app)
        .post(`/api/shorten`)
        .send(requestPayload);
      
      expect(response.status).toBe(200);
      const { body } = response;
      expect(body.url).toBe('https://example.com');
    });
  });

  describe("PUT /:shortCode", () => {
    it("[ERROR] document not found", async () => {
      const shortCode = 'abc123';
      const newUrl = 'https://newurl.com';
    
      const response = await request(app)
        .put(`/api/shorten/${shortCode}`)
        .send({ url: newUrl });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Short URL not found');
    });
    
    it("[SUCCESS] should update the short URL successfully", async () => {
      const shortCode = 'abc123';
      const newUrl = 'https://newurl.com';

      const updateShortUrlMock = vi.spyOn(urlService, 'updateShortUrl');

      updateShortUrlMock.mockResolvedValue({
        id: '123',
        url: 'https://newurl.com',
        shortCode: 'abc123',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        accessCount: undefined,
      });

      const response = await request(app)
        .put(`/api/shorten/${shortCode}`)
        .send({ url: newUrl });

      expect(response.status).toBe(200);
      expect(response.body.url).toBe(newUrl);
    });
  });

  describe("DELETE /:shortCode", () => {
    it("[ERROR] document not found", async () => {
      const shortCode = 'abc123';
    
      const response = await request(app)
        .delete(`/api/shorten/${shortCode}`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Short URL not found');
    });

    it("[SUCCESS] should delete the document successfully", async () => {
      const shortCode = 'abc123';

      const deleteShortUrlMock = vi.spyOn(urlService, 'deleteShortUrl');

      deleteShortUrlMock.mockResolvedValue();
    
      const response = await request(app)
        .delete(`/api/shorten/${shortCode}`);
      
      expect(response.status).toBe(204);
    });
  });

  describe("GET /:shortCode/stats", () => {
    it("[ERROR] stats document not found", async () => {
      const shortCode = 'abc123';
    
      const response = await request(app)
        .get(`/api/shorten/${shortCode}/stats`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Short URL not found');
    });

    it("[SUCCESS] should get stats for the document successfully", async () => {
      const shortCode = 'abc123';

      const getShortUrlStatsMock = vi.spyOn(urlService, 'getShortUrlStats');

      getShortUrlStatsMock.mockResolvedValue({
        id: '123',
        url: 'https://example.com',
        shortCode: 'abc123',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        accessCount: 1,
      });
    
      const response = await request(app)
        .get(`/api/shorten/${shortCode}/stats`);
      
      expect(response.status).toBe(200);
      expect(response.body.url).toBe('https://example.com');
      expect(response.body.accessCount).toBe(1);
    });
  });

  it("[ERROR] middleware token error", async () => {
    const shortCode = 'abc123';
    const invalidUrl = 'invalid-url';

    const getShortUrlMock = vi.spyOn(urlService, 'getShortUrl');

    getShortUrlMock.mockRejectedValue(new Error('No token provided'));

    const response = await request(app)
      .get(`/api/shorten/${shortCode}`)
      .send({ url: invalidUrl });

    expect(response.status).toBe(401);
    const { body } = response;
    expect(body.message).toBe('No token provided');
  });
});
