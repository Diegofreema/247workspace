import {
  DATABASE_ID,
  PROFILE_ID,
  TICKET_COMMENT_ID,
  TICKET_ID,
} from '@/config';
import { sessionMiddleware } from '@/lib/session-middleware';
import { CommentType, Profile, TicketsType } from '@/types';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { ID, Query } from 'node-appwrite';
import { z } from 'zod';
import { commentSchema } from '../schema';

const app = new Hono()
  .get(
    '/:ticketId',
    sessionMiddleware,
    zValidator('param', z.object({ ticketId: z.string() })),
    async (c) => {
      const { ticketId } = c.req.valid('param');
      const user = c.get('user');
      const databases = c.get('databases');
      const ticket = await databases.getDocument<TicketsType>(
        DATABASE_ID,
        TICKET_ID,
        ticketId
      );

      if (!ticket) {
        return c.json({ error: 'Ticket not found' }, 404);
      }

      const comments = await databases.listDocuments<CommentType>(
        DATABASE_ID,
        TICKET_ID,
        [Query.equal('ticketId', ticketId)]
      );

      const commentsWithProfile = await Promise.all(
        comments.documents.map(async (comment) => {
          const profile = await databases.getDocument<Profile>(
            DATABASE_ID,
            PROFILE_ID,
            comment.authorId
          );
          return {
            ...comment,
            author: profile,
          };
        })
      );

      return c.json({ data: { ...comments, documents: commentsWithProfile } });
    }
  )
  .post(
    '/:ticketId',
    sessionMiddleware,
    zValidator('json', commentSchema),
    async (c) => {
      const { ticketId } = c.req.param();
      const { comment, authorId } = c.req.valid('json');
      const user = c.get('user');
      const databases = c.get('databases');
      const ticket = await databases.getDocument<TicketsType>(
        DATABASE_ID,
        TICKET_ID,
        ticketId
      );
      if (!ticket) {
        return c.json({ error: 'Ticket not found' }, 404);
      }

      const commentDoc = await databases.createDocument<CommentType>(
        DATABASE_ID,
        TICKET_COMMENT_ID,
        ID.unique(),
        {
          comment,
          authorId,
          ticketId,
        }
      );

      return c.json({ data: commentDoc });
    }
  )
  .patch(
    '/:commentId',
    sessionMiddleware,
    zValidator('json', commentSchema.partial()),
    async (c) => {
      const { commentId } = c.req.param();
      const { comment, authorId } = c.req.valid('json');

      const databases = c.get('databases');
      const commentDoc = await databases.getDocument<CommentType>(
        DATABASE_ID,
        TICKET_COMMENT_ID,
        commentId
      );
      if (!commentDoc) {
        return c.json({ error: 'Comment not found' }, 404);
      }
      if (commentDoc.authorId !== authorId) {
        return c.json(
          { error: 'You are not authorized to update this comment' },
          401
        );
      }

      const updatedComment = await databases.updateDocument<CommentType>(
        DATABASE_ID,
        TICKET_COMMENT_ID,
        commentId,
        {
          comment,
        }
      );
      return c.json({ data: updatedComment });
    }
  )
  .delete(
    '/:commentId',
    sessionMiddleware,
    zValidator('json', z.object({ authorId: z.string() })),
    async (c) => {
      const { commentId } = c.req.param();
      const { authorId } = c.req.valid('json');
      const databases = c.get('databases');

      const comment = await databases.getDocument<CommentType>(
        DATABASE_ID,
        TICKET_COMMENT_ID,
        commentId
      );

      if (!comment) {
        return c.json({ error: 'Comment not found' }, 404);
      }
      if (comment.authorId !== authorId) {
        return c.json(
          { error: 'You are not authorized to delete this comment' },
          401
        );
      }
      await databases.deleteDocument(DATABASE_ID, TICKET_COMMENT_ID, commentId);
      return c.json({ data: commentId });
    }
  );

export default app;
