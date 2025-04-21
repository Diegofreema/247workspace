import { sessionMiddleware } from '@/lib/session-middleware';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { createDocumentSchema } from '../schema';
import { z } from 'zod';
import { DATABASE_ID, DOCUMENT_ID, IMAGES_BUCKET_ID, VIEW_URL } from '@/config';
import { AppwriteException, ID, Query } from 'node-appwrite';
import { DocumentType } from '@/types';
import { getMember } from '@/features/members/utils';

const app = new Hono()
  .get(
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
  )
  .post(
    '/',
    sessionMiddleware,
    zValidator('form', createDocumentSchema),
    async (c) => {
      const databases = c.get('databases');
      const user = c.get('user');
      const storage = c.get('storage');
      const { name, documentUrl, workspaceId, projectId, uploadedBy } =
        c.req.valid('form');

      try {
        let link: string | undefined;

        if (documentUrl instanceof File) {
          const file = await storage.createFile(
            IMAGES_BUCKET_ID,
            ID.unique(),
            documentUrl
          );

          link = `${VIEW_URL}/${IMAGES_BUCKET_ID}/files/${file.$id}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT}&mode=admin`;
        }

        const member = await getMember({
          databases,
          userId: user.$id,
          workspaceId,
        });

        if (!member) {
          return c.json(
            {
              error: 'Unauthorized',
            },
            401
          );
        }

        const document = await databases.createDocument<DocumentType>(
          DATABASE_ID,
          DOCUMENT_ID,
          ID.unique(),
          {
            name,
            workspaceId,
            projectId,
            uploadedBy,
            documentUrl: link,
          }
        );

        return c.json({
          data: document,
        });
      } catch (error) {
        // console.log(error);
        return c.json(
          {
            error: 'Something went wrong, please try again',
          },
          500
        );
      }
    }
  )
  .get('/:documentId', sessionMiddleware, async (c) => {
    const databases = c.get('databases');
    const storage = c.get('storage');
    const { documentId } = c.req.param();

    const document = await databases.getDocument<DocumentType>(
      DATABASE_ID,
      DOCUMENT_ID,
      documentId
    );

    const arrayBufferToBase64 = await storage.getFileView(
      IMAGES_BUCKET_ID,
      document.documentId
    );

    const documentFile = `data:image/png;base64,${Buffer.from(arrayBufferToBase64).toString('base64')}`;
    console.log(documentFile);

    return c.json({
      data: {
        ...document,
        documentFile,
      },
    });
  });

export default app;
