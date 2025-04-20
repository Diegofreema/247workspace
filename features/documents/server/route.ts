import { sessionMiddleware } from '@/lib/session-middleware';
import { Hono } from 'hono';

const app = new Hono().get('/', sessionMiddleware, async (c) => {
  const databases = c.get('databases');
  const user = c.get('user');
});

export default app;
