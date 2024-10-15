import { describe, it, expect } from 'vitest';
import { ZodError, ZodIssue } from 'zod';
import { translateError } from '../../src/helpers/errors';

describe('translateError', () => {
  it('should return 404 for "Short URL not found" error', () => {
    const error = new Error('Short URL not found');
    const result = translateError(error);
    expect(result).toEqual({
      statusCode: 404,
      message: 'Short URL not found',
    });
  });

  it('should return 400 for "Invalid url" ZodError', () => {
    const zodIssue: ZodIssue = {
      code: 'custom',
      message: 'Invalid url',
      path: [],
    };
    const zodError = new ZodError([zodIssue]);
    const result = translateError(zodError);
    expect(result).toEqual({
      statusCode: 400,
      message: 'undefined Invalid url',
    });
  });

  it('should return 520 for unknown error message', () => {
    const error = new Error('Unknown error');
    const result = translateError(error);
    expect(result).toEqual({
      statusCode: 520,
      message: 'Unknown error',
    });
  });
});
