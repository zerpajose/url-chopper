import { z } from 'zod';

export const createShortUrlSchema = z.object({
  url: z.string().url(),
});

export const updateShortUrlSchema = z.object({
  url: z.string().url(),
});
