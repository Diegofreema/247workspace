import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { AppwriteException, ID } from 'node-appwrite';
import { deleteCookie, setCookie } from 'hono/cookie';
import { createAdminClient } from '@/lib/appwrite';
import { SignInValidator, SignUpValidator } from '@/utils/validators';
import { AUTH_COOKIE } from '../constants';
import { sessionMiddleware } from '@/lib/session-middleware';

const app = new Hono()
  .get('/current', sessionMiddleware, (c) => {
    const user = c.get('user');

    return c.json({ data: user });
  })
  .post('/login', zValidator('json', SignInValidator), async (c) => {
    const { email, password } = c.req.valid('json');
    try {
      const { account } = await createAdminClient();
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
        return c.json({ success: false, errorMessage: error.message });
      }
      return c.json({
        success: false,
        errorMessage: 'Something went wrong, please try again',
      });
    }
  })
  .post('/register', zValidator('json', SignUpValidator), async (c) => {
    const { email, password, fullName } = c.req.valid('json');
    const { account } = await createAdminClient();
    try {
      await account.create(ID.unique(), email, password, fullName);
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
