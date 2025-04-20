import { sessionMiddleware } from '@/lib/session-middleware';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { createDocumentSchema } from '../schema';
import { z } from 'zod';
import { DATABASE_ID, DOCUMENT_ID, IMAGES_BUCKET_ID } from '@/config';
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
        let fileId: string | undefined;
        if (documentUrl instanceof File) {
          const file = await storage.createFile(
            IMAGES_BUCKET_ID,
            ID.unique(),
            documentUrl
          );

          fileId = file.$id;
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
            documentId: fileId,
            workspaceId,
            projectId,
            uploadedBy,
          }
        );

        return c.json({
          data: document,
        });
      } catch (error) {
        console.log(error);
        return c.json(
          {
            error: 'Something went wrong, please try again',
          },
          500
        );
      }
      // console.log(error);

      // if (error instanceof AppwriteException) {
      //   let errorMessage = error.message;
      //   if (error.type === 'document_invalid_structure') {
      //     errorMessage = 'Missing a required field';
      //   }
      //   if (error.type === 'storage_invalid_file_size') {
      //     errorMessage = 'File size is too large, max 1mb';
      //   }
      //   return c.json(
      //     {
      //       error: errorMessage,
      //     },
      //     400
      //   );
      // }
      // return c.json(
      //   {
      //     error: 'Something went wrong, please try again',
      //   },
      //   500
      // );
    }
  );

export default app;
