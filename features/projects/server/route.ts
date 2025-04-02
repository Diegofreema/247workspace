import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';

import { createProjectSchema } from '../schema';
import { sessionMiddleware } from '@/lib/session-middleware';
import { DATABASE_ID, IMAGES_BUCKET_ID, PROJECT_ID } from '@/config';
import { AppwriteException, ID } from 'node-appwrite';

const app = new Hono().post(
  '/',
  zValidator('form', createProjectSchema),
  sessionMiddleware,
  async (c) => {
    const databases = c.get('databases');
    const user = c.get('user');
    const storage = c.get('storage');
    const { name, image } = c.req.valid('form');
    console.log({ name, image });

    let fileId: string | undefined;
    if (image instanceof File) {
      const file = await storage.createFile(
        IMAGES_BUCKET_ID,
        ID.unique(),
        image
      );

      fileId = file.$id;
    }
    try {
      if (!user)
        return c.json({ success: false, errorMessage: 'UnAuthorized' });
      await databases.createDocument(DATABASE_ID, PROJECT_ID, ID.unique(), {
        name,
        userId: user.$id,
        imageId: fileId,
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
