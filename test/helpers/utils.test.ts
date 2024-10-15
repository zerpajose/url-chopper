import { describe, it, expect } from 'vitest';
import { generateRandomString, responseDecorator, encrypt, decrypt } from '../../src/helpers/utils';
import { ShortUrl } from '../../src/types';

describe('generateRandomString', () => {
  it('should generate a string of default length 10', () => {
    const result = generateRandomString();
    expect(result).toHaveLength(10);
  });

  it('should generate a string of specified length', () => {
    const length = 15;
    const result = generateRandomString(length);
    expect(result).toHaveLength(length);
  });

  it('should generate unique strings', () => {
    const result1 = generateRandomString();
    const result2 = generateRandomString();
    expect(result1).not.toBe(result2);
  });
});

describe('responseDecorator', () => {
  it('should correctly decorate a ShortUrl object', () => {
    const shortUrl: ShortUrl = {
      id: '1',
      url: 'https://example.com',
      shortCode: 'abc123',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      accessCount: 0,
    };

    const result = responseDecorator(shortUrl);
    expect(result).toEqual({
      id: shortUrl.id,
      url: shortUrl.url,
      shortCode: shortUrl.shortCode,
      createdAt: shortUrl.createdAt,
      updatedAt: shortUrl.updatedAt,
      accessCount: shortUrl.accessCount,
    });
  });
});

describe('Encryption and Decryption', () => {
  it('should encrypt text', () => {
    const text = 'topSecretText';
    const encrypted = encrypt(text);
    expect(decrypt(encrypted)).toBe('topSecretText');
  });

  it('should decrypt text', () => {
    const toBeEncrypted = 'topSecretToBeEncryptedText';
    const encryptedText = encrypt(toBeEncrypted);
    const decrypted = decrypt(encryptedText);
    expect(decrypted).toBe('topSecretToBeEncryptedText');
  });
});
