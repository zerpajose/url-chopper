import express from 'express';
import shortUrlRouter from './routes/short-url.route';

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 8080;

app.get('/ping', (_req, res) => {
  res.json({
    result: 'pong',
    date: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

app.use('/api/shorten', shortUrlRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
