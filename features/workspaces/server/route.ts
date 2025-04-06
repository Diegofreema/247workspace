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
import { createWorkspaceSchema, editWorkspaceSchema } from '../schema';
import { MemberRole } from '@/types';
import { generateRandomString } from '@/utils/helper';
import { getMember } from '@/features/members/utils';

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
          $id: null,
        });
      }
    }
  )
  .patch(
    '/:workspaceId',
    sessionMiddleware,
    zValidator('form', editWorkspaceSchema),
    async (c) => {
      const databases = c.get('databases');
      const storage = c.get('storage');
      const user = c.get('user');
      const { workspaceId } = c.req.param();
      const { name, image } = c.req.valid('form');
      const member = await getMember({
        databases,
        workspaceId,
        userId: user.$id,
      });
      if (!member || member.role !== MemberRole.ADMIN) {
        return c.json(
          {
            success: false,
            errorMessage: 'Unauthorized',
            workspace: null,
          },
          401
        );
      }
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
      } else {
        uploadUrl = image;
      }
      try {
        if (!user)
          return c.json({
            success: false,
            errorMessage: 'UnAuthorized',
            workspace: null,
          });

        const workspace = await databases.updateDocument(
          DATABASE_ID,
          WORKSPACE_ID,
          workspaceId,
          {
            name,
            imageUrl: uploadUrl,
          }
        );

        return c.json({
          success: true,
          errorMessage: null,
          workspace: workspace,
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
            workspace: null,
          });
        }
        return c.json({
          success: false,
          errorMessage: 'Something went wrong, please try again',
          workspace: null,
        });
      }
    }
  )
  .delete('/:workspaceId', sessionMiddleware, async (c) => {
    const { workspaceId } = c.req.param();
    const databases = c.get('databases');
    const user = c.get('user');
    const member = await getMember({
      databases,
      userId: user.$id,
      workspaceId,
    });
    if (!member || member.role !== MemberRole.ADMIN) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    await databases.deleteDocument(DATABASE_ID, WORKSPACE_ID, workspaceId);

    return c.json({ data: { $id: workspaceId } });
  })
  .post('/:workspaceId/reset-invite-code', sessionMiddleware, async (c) => {
    const { workspaceId } = c.req.param();
    const databases = c.get('databases');
    const user = c.get('user');
    const member = await getMember({
      databases,
      userId: user.$id,
      workspaceId,
    });
    if (!member || member.role !== MemberRole.ADMIN) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    await databases.updateDocument(DATABASE_ID, WORKSPACE_ID, workspaceId, {
      inviteCode: generateRandomString(10),
    });

    return c.json({ data: { $id: workspaceId } });
  });

export default app;
