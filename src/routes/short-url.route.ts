import express, { Request, Response } from 'express';
import {
  getShortUrl,
  createShortUrl,
  updateShortUrl,
  deleteShortUrl,
  getShortUrlStats,
} from '../services/url.service';
import { createShortUrlSchema, updateShortUrlSchema } from '../validations/url-service.shemas';

/*
 * Validation schemas
 * DB connection (firestore)
 * Error handling
 * Fails if url already exists
 * Fails if shrotCode already exists
 * Unit tests
 * Free account only 10 url's
 * Premium accounts, infinite urls
 */

const router = express.Router();

router.get('/:shortCode', async (req, res) => {
  const { shortCode } = req.params;
  try {
    const shortUrl = await getShortUrl(shortCode);
    return res.json(shortUrl);
  } catch (error) {
    return res.status(404).send({ message: error.message });
  } finally {
    res.end();
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const { url } = createShortUrlSchema.parse(req.body);

    const shortenedUrl = await createShortUrl({ url });

    res.json(shortenedUrl);
  } catch (error) {
    res.status(400).send(error.message);
  } finally {
    res.end();
  }
});

router.put('/:shortCode', async (req: Request, res: Response) => {
  try {
    const { shortCode } = req.params;
    const { url } = updateShortUrlSchema.parse(req.body);

    const updatedShortUrl = await updateShortUrl(shortCode, url);

    res.json(updatedShortUrl);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete('/:shortCode', async (req: Request, res: Response) => {
  try {
    const { shortCode } = req.params;

    await deleteShortUrl(shortCode);

    res.sendStatus(204);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get('/:shortCode/stats', async (req: Request, res: Response) => {
  try {
    const { shortCode } = req.params;

    const stats = await getShortUrlStats(shortCode);

    res.json(stats);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

export default router;
