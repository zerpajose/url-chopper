import express from 'express';
import shortUrlRouter from './routes/short-url.route';

const app = express();

app.use(express.json());

const PORT = 8080;

app.get('/ping', (_req, res) => {
  console.log(`someone pinged here! ${new Date().toLocaleDateString()}`);
  res.json({ result: 'pong' });
})

app.use('/api/shorten', shortUrlRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
