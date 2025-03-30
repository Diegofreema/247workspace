import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import auth from '@/components/features/auth/server/route';

export const runtime = 'nodejs';

const app = new Hono().basePath('/api');

const routes = app.route('/auth', auth);

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof routes;
