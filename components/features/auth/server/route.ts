import { SignInValidator, SignUpValidator } from '@/utils/validators';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';

const app = new Hono()
  .post('/login', zValidator('json', SignInValidator), (c) => {
    const { email, password } = c.req.valid('json');
    return c.json({ email, password });
  })
  .post('/register', zValidator('json', SignUpValidator), (c) => {
    const { email, password, fullName, role } = c.req.valid('json');
    return c.json({ email, password, fullName, role });
  });

export default app;
