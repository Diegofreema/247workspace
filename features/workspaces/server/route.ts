/* eslint-disable @typescript-eslint/no-explicit-any */
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';

import {
  DATABASE_ID,
  IMAGES_BUCKET_ID,
  MEMBERS_ID,
  WORKSPACE_ID,
} from '@/config';
import { sessionMiddleware } from '@/lib/session-middleware';
import { AppwriteException, ID, Query } from 'node-appwrite';
import { createWorkspaceSchema } from '../schema';
import { MemberRole } from '@/types';
import { generateRandomString } from '@/utils/helper';

const app = new Hono()
  .get('/', sessionMiddleware, async (c) => {
    const databases = c.get('databases');
    const user = c.get('user');
    const members = await databases.listDocuments(DATABASE_ID, MEMBERS_ID, [
      Query.equal('userId', user.$id),
    ]);

    if (members.total === 0) {
      return c.json({ data: { documents: [] as any[], total: 0 } });
    }

    const workspaceIds = members.documents.map((member) => member.workspaceId);

    const data = await databases.listDocuments(DATABASE_ID, WORKSPACE_ID, [
      Query.orderDesc('$createdAt'),
      Query.contains('$id', workspaceIds),
    ]);

    return c.json({ data: data });
  })
  .post(
    '/',
    zValidator('form', createWorkspaceSchema),
    sessionMiddleware,
    async (c) => {
      const databases = c.get('databases');
      const user = c.get('user');
      const storage = c.get('storage');
      const { name, image } = c.req.valid('form');

      let uploadUrl: string | undefined;
      if (image instanceof File) {
        const file = await storage.createFile(
          IMAGES_BUCKET_ID,
          ID.unique(),
          image
        );

        const arrayBufferToBase64 = await storage.getFileView(
          file.bucketId,
          file.$id
        );
        uploadUrl = `data:image/png;base64,${Buffer.from(arrayBufferToBase64).toString('base64')}`;
      }
      try {
        if (!user)
          return c.json({
            success: false,
            errorMessage: 'UnAuthorized',
            $id: null,
          });

        const workspace = await databases.createDocument(
          DATABASE_ID,
          WORKSPACE_ID,
          ID.unique(),
          {
            name,
            userId: user.$id,
            imageUrl: uploadUrl,
            inviteCode: generateRandomString(10),
          }
        );
        await databases.createDocument(DATABASE_ID, MEMBERS_ID, ID.unique(), {
          userId: user.$id,
          workspaceId: workspace.$id,
          role: MemberRole.ADMIN,
        });
        return c.json({
          success: true,
          errorMessage: null,
          $id: workspace.$id,
        });
      } catch (error) {
        console.log(error);

        if (error instanceof AppwriteException) {
          let errorMessage = error.message;
          if (error.type === 'document_invalid_structure') {
            errorMessage = 'Missing a required field';
          }
          if (error.type === 'storage_invalid_file_size') {
            errorMessage = 'File size is too large, max 1mb';
          }
          return c.json({
            success: false,
            errorMessage: errorMessage,
            $id: null,
          });
        }
        return c.json({
          success: false,
          errorMessage: 'Something went wrong, please try again',
        });
      }
    }
  );

export default app;
