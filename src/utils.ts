import { ShortUrl } from './types';

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
