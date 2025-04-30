import { DATABASE_ID, IMAGES_BUCKET_ID, PROFILE_ID } from '@/config';
import { sessionMiddleware } from '@/lib/session-middleware';
import { Profile } from '@/types';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { z } from 'zod';
import { profileSchema } from '../schema';
import { ID } from 'node-appwrite';

const app = new Hono()
  .get(
    '/:profileId',
    sessionMiddleware,
    zValidator('param', z.object({ profileId: z.string() })),
    async (c) => {
      const { profileId } = c.req.valid('param');
      const databases = c.get('databases');
      const profile = await databases.getDocument<Profile>(
        DATABASE_ID,
        PROFILE_ID,
        profileId
      );
      if (!profile) {
        return c.json({ message: 'Profile not found' }, 404);
      }
      return c.json({ data: profile });
    }
  )
  .patch(
    '/:profileId',
    sessionMiddleware,
    zValidator('form', profileSchema.partial()),
    async (c) => {
      const databases = c.get('databases');
      const storage = c.get('storage');
      const { name, bio, email, image, phone } = c.req.valid('form');
      const { profileId } = c.req.param();

      try {
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

        const profile = await databases.updateDocument<Profile>(
          DATABASE_ID,
          PROFILE_ID,
          profileId,
          {
            name,
            bio,
            email,
            avatarUrl: uploadUrl,
            phone,
          }
        );
        return c.json({ data: profile });
      } catch (error) {
        console.log(error);

        return c.json({ error: 'Something went wrong' }, 500);
      }
    }
  );

export default app;
