import { afterEach, expect, it, describe, vi } from 'vitest'
import request from 'supertest';
import express from 'express';
import router from '../../src/routes/auth.route';
import * as authService from '../../src/services/auth.service';

const app = express();
app.use(express.json());
app.use('/api/auth', router);

describe("/api/auth/", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("[ERROR] should return 400 for invalid payload", async () => {
    const invalidPaylod = {};

    const response = await request(app)
      .post(`/api/auth/issue-token`)
      .send(invalidPaylod);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('username Required');
  });

  it("[SUCCESS] should create the document successfully", async () => {
    const requestPayload = { username: 'myusername' };

    const issueTokenMock = vi.spyOn(authService, 'issueToken');

    issueTokenMock.mockResolvedValue({
      accessToken: 'myaccesstoken',
    });
  
    const response = await request(app)
      .post(`/api/auth/issue-token`)
      .send(requestPayload);
    
    expect(response.status).toBe(201);
    const { body } = response;
    expect(body.accessToken).toBe('myaccesstoken');
  });
});
