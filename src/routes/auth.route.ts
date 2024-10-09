import express, { Request, Response } from 'express';
import { User } from '../types';
import { translateError } from '../helpers/errors';
import { issueTokenSchema } from '../validations/auth-service-schemas';
import { issueToken } from '../services/auth.service';

const router = express.Router();

router.post('/issue-token', async (req: Request, res: Response) => {
    try {
      const { username } = issueTokenSchema.parse(req.body) as User;
      const { accessToken } = await issueToken({ username });
      
      res.status(201).json({ accessToken });
    } catch (error) {
      const errorTranslated = translateError(error);
      res.status(errorTranslated.statusCode).json({ message: errorTranslated.message, error });
    }
});

export default router;
