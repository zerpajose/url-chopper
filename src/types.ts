import { JwtPayload } from 'jsonwebtoken';
import { Request } from 'express';

export interface ShortUrl {
  id: string;
  url: string;
  shortCode: string;
  createdAt?: string;
  updatedAt?: string;
  accessCount?: number;
}

export interface CreateShortUrlInput {
  url: string;
}

export interface CreateTokenInput {
  username: string;
  passphrase?: string;
}

export interface GetTokenInput {
  id: string;
  username: string;
  accessToken: string;
}

export interface User {
  username: string;
  passphrase?: string;
}

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}
