import { DATABASE_ID, PROFILE_ID, TICKET_ID, WORKSPACE_ID } from '@/config';
import { getMember } from '@/features/members/utils';
import { sessionMiddleware } from '@/lib/session-middleware';
import { TicketStatus, TicketsType, Workspace } from '@/types';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { Query } from 'node-appwrite';
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
      page: z.string().nullish(),
    })
  ),
  async (c) => {
    const { workspaceId, assigneeId, search, status, page } =
      c.req.valid('query');
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
    const limit = 25;
    const pageNumber = Number(page) || 1;
    const offset = (pageNumber - 1) * limit;

    const query = [
      Query.equal('workspaceId', workspaceId),
      Query.orderDesc('$createdAt'),
      Query.limit(limit),
      Query.offset(offset),
    ];
    if (status) {
      query.push(Query.equal('status', status));
    }
    if (assigneeId) {
      query.push(Query.equal('assigneeId', assigneeId));
    }
    if (search) {
      query.push(Query.search('subject', search));
    }

    const tickets = await databases.listDocuments<TicketsType>(
      DATABASE_ID,
      TICKET_ID,
      query
    );

    const ticketsWithAssigneeAndRaisedBy = await Promise.all(
      tickets.documents.map(async (ticket) => {
        const assignee = await databases.getDocument(
          DATABASE_ID,
          PROFILE_ID,
          ticket.assigneeId
        );
        const raisedBy = await databases.getDocument(
          DATABASE_ID,
          PROFILE_ID,
          ticket.raisedBy
        );

        return {
          ...ticket,
          assignee,
          raisedBy,
        };
      })
    );
    return c.json({ data: ticketsWithAssigneeAndRaisedBy });
  }
);

export default app;
