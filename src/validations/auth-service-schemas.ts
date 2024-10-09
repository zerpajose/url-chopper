import { z } from 'zod';

export const issueTokenSchema = z.object({
  username: z.string().min(3).max(255),
  passphrase: z.string().min(8).max(255).optional(),
});
