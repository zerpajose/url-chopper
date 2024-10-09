import express, { Request, Response } from 'express';
import { translateError } from '../helpers/errors';
import { authenticateToken } from '../services/auth.service';
import {
  getShortUrl,
  createShortUrl,
  updateShortUrl,
  deleteShortUrl,
  getShortUrlStats,
} from '../services/url.service';
import { createShortUrlSchema, updateShortUrlSchema } from '../validations/url-service.schemas';

const router = express.Router();

router.get('/:shortCode', authenticateToken, async (req: Request, res: Response) => {
  const { shortCode } = req.params;
  try {
    const shortUrl = await getShortUrl(shortCode);
    res.status(200).json(shortUrl);
  } catch (error) {
    const errorTranslated = translateError(error);
    res.status(errorTranslated.statusCode).send({ message: errorTranslated.message });
  }
});

router.post('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { url } = createShortUrlSchema.parse(req.body);

    const shortenedUrl = await createShortUrl({ url });

    res.status(200).json(shortenedUrl);
  } catch (error) {
    const errorTranslated = translateError(error);
    res.status(errorTranslated.statusCode).send({ message: errorTranslated.message });
  }
});

router.put('/:shortCode', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { shortCode } = req.params;
    const { url } = updateShortUrlSchema.parse(req.body);

    const updatedShortUrl = await updateShortUrl(shortCode, url);

    res.status(200).json(updatedShortUrl);
  } catch (error) {
    const errorTranslated = translateError(error);
    res.status(errorTranslated.statusCode).send({ message: errorTranslated.message });
  }
});

router.delete('/:shortCode', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { shortCode } = req.params;

    await deleteShortUrl(shortCode);

    res.status(204).json({ message: 'Short URL deleted' });
  } catch (error) {
    const errorTranslated = translateError(error);
    res.status(errorTranslated.statusCode).send({ message: errorTranslated.message });
  }
});

router.get('/:shortCode/stats', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { shortCode } = req.params;

    const stats = await getShortUrlStats(shortCode);

    res.status(200).json(stats);
  } catch (error) {
    const errorTranslated = translateError(error);
    res.status(errorTranslated.statusCode).send({ message: errorTranslated.message });
  }
});

export default router;
