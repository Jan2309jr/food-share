import express from 'express';
import cors from 'cors';
import donationsRouter from './routes/donations.js';

const app = express();
const DEFAULT_PORT = process.env.PORT ? Number(process.env.PORT) : 5000;

app.use(cors());
app.use(express.json());
app.use('/api/donations', donationsRouter);

app.get('/', (req, res) => {
  res.send({ message: 'FoodShare API is running' });
});

const startServer = (port) => {
  const server = app.listen(port, () => {
    console.log(`FoodShare server listening on http://localhost:${port}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE' && port === DEFAULT_PORT) {
      const fallbackPort = DEFAULT_PORT === 5000 ? 5001 : DEFAULT_PORT + 1;
      console.warn(`Port ${DEFAULT_PORT} is in use, trying port ${fallbackPort} instead.`);
      startServer(fallbackPort);
    } else {
      console.error('Server failed to start:', err);
      process.exit(1);
    }
  });
};

startServer(DEFAULT_PORT);
