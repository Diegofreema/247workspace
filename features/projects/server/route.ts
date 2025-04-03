import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';

import { DATABASE_ID, IMAGES_BUCKET_ID, PROJECT_ID } from '@/config';
import { sessionMiddleware } from '@/lib/session-middleware';
import { AppwriteException, ID } from 'node-appwrite';
import { createProjectSchema } from '../schema';

const app = new Hono()
  .get('/', sessionMiddleware, async (c) => {
    const databases = c.get('databases');

    const data = await databases.listDocuments(DATABASE_ID, PROJECT_ID);

    return c.json({ data: data });
  })
  .post(
    '/',
    zValidator('form', createProjectSchema),
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
        console.log(uploadUrl);
      }
      try {
        if (!user)
          return c.json({ success: false, errorMessage: 'UnAuthorized' });
        await databases.createDocument(DATABASE_ID, PROJECT_ID, ID.unique(), {
          name,
          userId: user.$id,
          image: uploadUrl,
        });

        return c.json({ success: true, errorMessage: null });
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
