import express, { Request, Response } from 'express';
import { User } from '../types';
import { issueTokenSchema } from '../validations/auth-service-schemas';
import { issueToken } from '../services/auth.service';

const router = express.Router();

router.post('/issue-token', async (req: Request, res: Response) => {
    const { username } = issueTokenSchema.parse(req.body) as User;
    const { accessToken } = await issueToken({ username });
    
    res.status(201).json({ accessToken });
});

export default router;
