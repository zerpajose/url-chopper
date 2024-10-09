import * as crypto from 'crypto';
import { ShortUrl } from '../types';

const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

export function encrypt(text: string): string {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

export function decrypt(encryptedText: string): string {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
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
