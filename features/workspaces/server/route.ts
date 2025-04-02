import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';

import { createWorkspaceSchema } from '../schema';
import { sessionMiddleware } from '@/lib/session-middleware';
import { DATABASE_ID, IMAGES_BUCKET_ID, WORKSPACES_ID } from '@/config';
import { AppwriteException, ID } from 'node-appwrite';

const app = new Hono().post(
  '/',
  zValidator('form', createWorkspaceSchema),
  sessionMiddleware,
  async (c) => {
    const databases = c.get('databases');
    const user = c.get('user');
    const storage = c.get('storage');
    const { name, image } = c.req.valid('form');
    let uploadedImageUrl: string | undefined;
    if (image instanceof File) {
      const file = await storage.createFile(
        IMAGES_BUCKET_ID,
        ID.unique(),
        image
      );

      const arrayBuffer = await storage.getFilePreview(
        IMAGES_BUCKET_ID,
        file.$id
      );
      uploadedImageUrl = `data:${file.mimeType};base64,${Buffer.from(arrayBuffer).toString('base64')}`;
    }
    try {
      if (!user)
        return c.json({ success: false, errorMessage: 'UnAuthorized' });
      await databases.createDocument(DATABASE_ID, WORKSPACES_ID, ID.unique(), {
        name,
        userId: user.$id,
        image: uploadedImageUrl,
      });

      return c.json({ success: true, errorMessage: null });
    } catch (error) {
      console.log(error);

      if (error instanceof AppwriteException) {
        let errorMessage = error.message;
        if (error.type === 'document_invalid_structure') {
          errorMessage = 'Missing a required field';
        }
        return c.json({ success: false, errorMessage: errorMessage });
      }
      return c.json({
        success: false,
        errorMessage: 'Something went wrong, please try again',
      });
    }
  }
);

export default app;
