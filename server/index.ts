import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { handleAiGenerate } from './handler';

dotenv.config({ path: '.env.local' });
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const isProd = process.env.NODE_ENV === 'production';
const port = Number(process.env.PORT || 3000);

async function start() {
  const app = express();
  app.set('trust proxy', true);
  app.use(express.json({ limit: '100kb' }));

  app.post('/api/ai/generate', handleAiGenerate);

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true, service: 'interdot-ai' });
  });

  if (!isProd) {
    const vite = await createViteServer({
      root,
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const dist = path.join(root, 'dist');
    app.use(express.static(dist));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(dist, 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Interdot running on http://localhost:${port}`);
  });
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
