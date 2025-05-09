import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import auth from '@/features/auth/server/route';
import workspaces from '@/features/workspaces/server/route';
import members from '@/features/members/server/route';
import projects from '@/features/projects/server/route';
import tasks from '@/features/tasks/server/route';
import documents from '@/features/documents/server/route';
import profile from '@/features/profile/server/route';
import feedbacks from '@/features/feedbacks/server/route';
import tickets from '@/features/tickets/server/route';
import comments from '@/features/comments/server/route';
export const runtime = 'nodejs';

const app = new Hono().basePath('/api');

const routes = app
  .route('/auth', auth)
  .route('/workspaces', workspaces)
  .route('/members', members)
  .route('/projects', projects)
  .route('/tasks', tasks)
  .route('/documents', documents)
  .route('/profile', profile)
  .route('/feedbacks', feedbacks)
  .route('/tickets', tickets)
  .route('/comments', comments);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);

export const DELETE = handle(app);

export type AppType = typeof routes;
