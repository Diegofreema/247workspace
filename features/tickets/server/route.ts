import { DATABASE_ID, PROFILE_ID, TICKET_ID, WORKSPACE_ID } from '@/config';
import { getMember } from '@/features/members/utils';
import { sessionMiddleware } from '@/lib/session-middleware';
import { Profile, TicketStatus, TicketsType, Workspace } from '@/types';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { ID, Query } from 'node-appwrite';
import { z } from 'zod';
import { createTicketSchema } from '../schema';

const app = new Hono()
  .get(
    '/',
    sessionMiddleware,
    zValidator(
      'query',
      z.object({
        workspaceId: z.string(),
        assigneeId: z.string().nullish(),
        status: z.nativeEnum(TicketStatus).nullish(),
        search: z.string().nullish(),
        page: z.string(),
      })
    ),
    async (c) => {
      const { workspaceId, assigneeId, search, status, page } =
        c.req.valid('query');
      const user = c.get('user');
      const databases = c.get('databases');

      try {
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
          return c.json(
            { error: 'You are not a member of this workspace' },
            401
          );
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
            const assignee = await databases.getDocument<Profile>(
              DATABASE_ID,
              PROFILE_ID,
              ticket.assigneeId
            );
            const raisedBy = await databases.getDocument<Profile>(
              DATABASE_ID,
              PROFILE_ID,
              ticket.raisedId
            );

            return {
              ...ticket,
              assignee,
              raisedBy,
            };
          })
        );
        return c.json({
          data: {
            ...tickets,
            documents: ticketsWithAssigneeAndRaisedBy,
          },
        });
      } catch (error) {
        console.log(error);

        return c.json(
          { error: 'Something went wrong, please try again later' },
          500
        );
      }
    }
  )
  .post(
    '/',
    sessionMiddleware,
    zValidator('json', createTicketSchema),
    async (c) => {
      const {
        workspaceId,
        assigneeId,
        status,
        subject,
        description,
        raisedId,
        priority,
      } = c.req.valid('json');
      const databases = c.get('databases');
      const user = c.get('user');

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
      const ticket = await databases.createDocument<TicketsType>(
        DATABASE_ID,
        TICKET_ID,
        ID.unique(),
        {
          workspaceId,
          assigneeId,
          status,
          subject,
          description,
          raisedId,
          priority,
        }
      );

      return c.json({ data: ticket });
    }
  )
  .delete(
    '/:ticketId',
    sessionMiddleware,
    zValidator('param', z.object({ ticketId: z.string() })),
    async (c) => {
      const { ticketId } = c.req.valid('param');
      const databases = c.get('databases');
      const user = c.get('user');
      const ticket = await databases.getDocument<TicketsType>(
        DATABASE_ID,
        TICKET_ID,
        ticketId
      );
      if (!ticket) {
        return c.json({ error: 'Ticket not found' }, 404);
      }
      const raisedBy = await databases.getDocument<Profile>(
        DATABASE_ID,
        PROFILE_ID,
        ticket.raisedBy
      );
      if (raisedBy.userId !== user.$id) {
        return c.json(
          { error: 'You are not authorized to delete this ticket' },
          401
        );
      }

      await databases.deleteDocument(DATABASE_ID, TICKET_ID, ticketId);
      return c.json({ data: ticketId });
    }
  );

export default app;
