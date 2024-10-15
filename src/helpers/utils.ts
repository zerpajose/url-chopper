import { randomBytes, createCipheriv, createDecipheriv } from 'crypto';
import { ShortUrl } from '../types';

const algorithm = 'aes-256-cbc';
const key = process.env.ENCRYPTION_SECRET || 'oM0ueiwngP0u1UYdxrO8A7Z0dUvKrZ9T';
const iv = randomBytes(16).toString('base64').slice(0, 16);

export function encrypt(text: string): string {
  const cipher = createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf-8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

export function decrypt(encryptedText: string): string {
  const decipher = createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');
  return decrypted;
}

export function generateRandomString(length = 10): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from(
    { length },
    () => characters[Math.floor(Math.random() * characters.length)],
  ).join('');
}

export function responseDecorator(data: ShortUrl) {
  const { id, url, shortCode, createdAt, updatedAt, accessCount } = data;

  return {
    id,
    url,
    shortCode,
    createdAt,
    updatedAt,
    accessCount,
  };
}
