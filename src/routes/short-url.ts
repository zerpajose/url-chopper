import express, { Request, Response } from 'express';
import * as urlService from '../services/url.services';
import { ShortUrl } from '../types';
import generateRandomString from '../utils';
import { randomUUID } from 'crypto';

const router = express.Router();

router.get('/:shortCode', (req, res) => {
  const { shortCode } = req.params;

  const shortUrl = urlService.getShortUrl(shortCode);

  return (shortUrl != null)
    ? res.send(shortUrl)
    : res.sendStatus(404);
});

router.post('/', (req: Request, res: Response) => {
  try {
    const id = randomUUID();
    const { url } = req.body;
    const shortCode = generateRandomString();

    const shortUrl: ShortUrl = {
      id,
      url,
      shortCode
    }

    const addedDiaryEntry = urlService.createShortUrl(shortUrl);

    res.json(addedDiaryEntry);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put('/:shortCode', (req: Request, res: Response) => {
  try {
    const { shortCode } = req.params;
    const { url } = req.body;

    const updatedShortUrl = urlService.updateShortUrl(shortCode, url);

    res.json(updatedShortUrl);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete('/:shortCode', (req: Request, res: Response) => {
  try {
    const { shortCode } = req.params;

    urlService.deleteShortUrl(shortCode);

    res.sendStatus(204);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get('/:shortCode/stats', (req: Request, res: Response) => {
  try {
    const { shortCode } = req.params;

    const stats = urlService.getShortUrlStats(shortCode);

    res.json(stats);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

export default router;
