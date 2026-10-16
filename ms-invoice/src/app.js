import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

const app = express();

const origins = [process.env.BACKEND_URL];

app.use(
  cors({
    origin: origins,
    allowedHeaders: ['Content-Type', 'X-User-Id'],
  })
);

app.use(express.json());

// Rutas
app.get(`/health`, (req, res) => {
  return res.status(200).json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.listen(process.env.PORT, () => {
  console.log(`MS Invoice corriendo en http://localhost:${process.env.PORT}`);
});

export default app;
