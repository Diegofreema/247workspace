import { DATABASE_ID, IMAGES_BUCKET_ID, PROJECT_ID } from '@/config';
import { getMember } from '@/features/members/utils';
import { sessionMiddleware } from '@/lib/session-middleware';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { AppwriteException, ID, Query } from 'node-appwrite';
import { z } from 'zod';
import { createProjectSchema, editProjectSchema } from '../schema';
import { Project } from '@/types';

const app = new Hono()
  .get(
    '/',
    sessionMiddleware,
    zValidator('query', z.object({ workspaceId: z.string() })),
    async (c) => {
      const { workspaceId } = c.req.valid('query');
      const databases = c.get('databases');
      const user = c.get('user');
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

      const projects = await databases.listDocuments<Project>(
        DATABASE_ID,
        PROJECT_ID,
        [Query.equal('workspaceId', workspaceId), Query.orderDesc('$createdAt')]
      );

      return c.json({
        data: projects,
      });
    }
  )
  .post(
    '/',
    zValidator('form', createProjectSchema),
    sessionMiddleware,
    async (c) => {
      const databases = c.get('databases');
      const user = c.get('user');
      const storage = c.get('storage');
      const { name, image, workspaceId } = c.req.valid('form');

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

        const project = await databases.createDocument<Project>(
          DATABASE_ID,
          PROJECT_ID,
          ID.unique(),
          {
            name,
            userId: user.$id,
            imageUrl: uploadUrl,
            workspaceId,
          }
        );

        return c.json({
          data: project,
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
          return c.json(
            {
              error: errorMessage,
            },
            400
          );
        }
        return c.json(
          {
            error: 'Something went wrong, please try again',
          },
          500
        );
      }
    }
  )
  .patch(
    '/:projectId',
    sessionMiddleware,
    zValidator('form', editProjectSchema),
    async (c) => {
      const databases = c.get('databases');
      const storage = c.get('storage');
      const user = c.get('user');
      const { projectId } = c.req.param();
      const { name, image } = c.req.valid('form');
      const existingProject = await databases.getDocument<Project>(
        DATABASE_ID,
        PROJECT_ID,
        projectId
      );
      const member = await getMember({
        databases,
        workspaceId: existingProject.workspaceId,
        userId: user.$id,
      });

      if (!member) {
        return c.json(
          {
            error: 'Unauthorized',
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
        const project = await databases.updateDocument(
          DATABASE_ID,
          PROJECT_ID,
          projectId,
          {
            name,
            imageUrl: uploadUrl,
          }
        );

        return c.json({
          data: project,
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
            error: errorMessage,
          });
        }
        return c.json({
          error: 'Something went wrong, please try again',
        });
      }
    }
  )
  .delete('/:projectId', sessionMiddleware, async (c) => {
    const { projectId } = c.req.param();
    const databases = c.get('databases');
    const user = c.get('user');
    const project = await databases.getDocument<Project>(
      DATABASE_ID,
      PROJECT_ID,
      projectId
    );
    const member = await getMember({
      databases,
      userId: user.$id,
      workspaceId: project.workspaceId,
    });
    if (!member) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    // ! do delete tasks linked to project
    await databases.deleteDocument(DATABASE_ID, PROJECT_ID, projectId);

    return c.json({ data: { $id: projectId } });
  });

export default app;
