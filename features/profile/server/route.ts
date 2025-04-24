import { DATABASE_ID, PROFILE_ID } from '@/config';
import { sessionMiddleware } from '@/lib/session-middleware';
import { Profile } from '@/types';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { z } from 'zod';

const app = new Hono().get(
  '/:profileId',
  sessionMiddleware,
  zValidator('param', z.object({ profileId: z.string() })),
  async (c) => {
    const { profileId } = c.req.valid('param');
    const databases = c.get('databases');
    const profile = await databases.getDocument<Profile>(
      DATABASE_ID,
      PROFILE_ID,
      profileId
    );
    if (!profile) {
      return c.json({ message: 'Profile not found' }, 404);
    }
    return c.json({ data: profile });
  }
);

export default app;
