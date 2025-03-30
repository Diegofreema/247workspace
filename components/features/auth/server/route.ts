import { SignInValidator } from '@/utils/validators';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
const app = new Hono().post(
  '/login',
  zValidator('json', SignInValidator),
  (c) => {
    const { email, password } = c.req.valid('json');
    return c.json({ email, password });
  }
);

export default app;
