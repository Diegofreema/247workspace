import 'server-only';

import {
  Account,
  Client,
  Storage,
  Databases,
  Models,
  type Account as AccountType,
  type Users as UserType,
  type Storage as StorageType,
  Databases as DatabaseType,
} from 'node-appwrite';

import { getCookie } from 'hono/cookie';

import { createMiddleware } from 'hono/factory';
import { AUTH_COOKIE } from '@/components/features/auth/constants';

type SessionMiddlewareType = {
  Variables: {
    account: AccountType;
    storage: StorageType;
    databases: DatabaseType;
    users: UserType;
    user: Models.User<Models.Preferences>;
  };
};

export const sessionMiddleware = createMiddleware<SessionMiddlewareType>(
  async (c, next) => {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

    const session = getCookie(c, AUTH_COOKIE);

    if (!session) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    client.setSession(session);

    const account = new Account(client);
    const storage = new Storage(client);
    const databases = new Databases(client);

    const user = await account.get();
    c.set('account', account);
    c.set('storage', storage);
    c.set('databases', databases);
    c.set('user', user);
    await next();
  }
);
