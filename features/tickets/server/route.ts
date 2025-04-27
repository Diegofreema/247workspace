import { DATABASE_ID, WORKSPACE_ID } from '@/config';
import { getMember } from '@/features/members/utils';
import { sessionMiddleware } from '@/lib/session-middleware';
import { TicketStatus, Workspace } from '@/types';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { z } from 'zod';

const app = new Hono().get(
  '/',
  sessionMiddleware,
  zValidator(
    'query',
    z.object({
      workspaceId: z.string(),
      assigneeId: z.string().nullish(),
      status: z.nativeEnum(TicketStatus).nullish(),
      search: z.string().nullish(),
    })
  ),
  async (c) => {
    const { workspaceId } = c.req.valid('query');
    const user = c.get('user');
    const databases = c.get('databases');
    const workspace = await databases.getDocument<Workspace>(
      DATABASE_ID,
      WORKSPACE_ID,
      workspaceId
    );
    const member = await getMember({
      databases,
      userId: user.$id,
      workspaceId: workspace.$id,
    });

    if (!member) {
      return c.json({ error: 'You are not a member of this workspace' }, 401);
    }
  }
);

export default app;
