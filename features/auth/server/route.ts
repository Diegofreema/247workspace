import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { AppwriteException, ID, Query } from 'node-appwrite';
import { deleteCookie, setCookie } from 'hono/cookie';
import { createAdminClient } from '@/lib/appwrite';
import { onboardSchema, SignUpValidator } from '@/utils/validators';
import { AUTH_COOKIE } from '../constants';
import { sessionMiddleware } from '@/lib/session-middleware';
import { DATABASE_ID, MEMBERS_ID, PROFILE_ID } from '@/config';
import { z } from 'zod';
import { Member, Profile } from '@/types';

const app = new Hono()
  .get('/current', sessionMiddleware, (c) => {
    const user = c.get('user');

    return c.json({ data: user });
  })
  .post(
    '/onBoard',
    sessionMiddleware,
    zValidator('json', onboardSchema),
    async (c) => {
      const { email, fullName, role, bio } = c.req.valid('json');
      const user = c.get('user');
      const databases = c.get('databases');
      try {
        const profile = await databases.createDocument(
          DATABASE_ID,
          PROFILE_ID,
          ID.unique(),
          {
            userId: user.$id,
            name: fullName,
            email: email,
            role: role,
            bio: bio,
          }
        );

        return c.json({ data: { profileId: profile.$id } });
      } catch (error) {
        console.log(error);
        if (error instanceof AppwriteException) {
          return c.json({ error: error.message }, 400);
        }
        return c.json(
          {
            error: 'Something went wrong, please try again',
          },
          400
        );
      }
    }
  )
  .post('/register', zValidator('json', SignUpValidator), async (c) => {
    const { email, password, fullName, role } = c.req.valid('json');
    const { account, databases } = await createAdminClient();
    try {
      const user = await account.create(ID.unique(), email, password, fullName);

      // await databases.createDocument(DATABASE_ID, PROFILE_ID, ID.unique(), {
      //   userId: user.$id,
      //   name: fullName,
      //   email: email,
      //   role: role,
      // });

      const session = await account.createEmailPasswordSession(email, password);
      setCookie(c, AUTH_COOKIE, session.secret, {
        httpOnly: true,
        sameSite: 'strict',
        path: '/',
        secure: true,
        maxAge: 60 * 60 * 24 * 30,
      });
      return c.json({ success: true, errorMessage: null });
    } catch (error) {
      console.log(error);
      if (error instanceof AppwriteException) {
        let errorMessage = error.message;
        if (error.type === 'user_already_exists') {
          errorMessage = 'User already exists, Please use a different email';
        }
        return c.json({ success: false, errorMessage: errorMessage });
      }
      return c.json({
        success: false,
        errorMessage: 'Something went wrong, please try again',
      });
    }
  })
  .post('/logout', sessionMiddleware, async (c) => {
    const account = c.get('account');

    deleteCookie(c, AUTH_COOKIE);
    await account.deleteSession('current');
    return c.json({ success: true });
  });

export default app;
