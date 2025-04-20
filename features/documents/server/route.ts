import { sessionMiddleware } from '@/lib/session-middleware';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { createDocumentSchema } from '../schema';
import { z } from 'zod';
import { DATABASE_ID, DOCUMENT_ID } from '@/config';
import { Query } from 'node-appwrite';
import { DocumentType } from '@/types';

const app = new Hono().get(
  '/',
  sessionMiddleware,
  zValidator('query', z.object({ projectId: z.string() })),
  async (c) => {
    const databases = c.get('databases');
    const { projectId } = c.req.valid('query');

    const documents = await databases.listDocuments<DocumentType>(
      DATABASE_ID,
      DOCUMENT_ID,
      [Query.equal('projectId', projectId), Query.orderDesc('$createdAt')]
    );
    return c.json({ data: documents });
  }
);

export default app;
