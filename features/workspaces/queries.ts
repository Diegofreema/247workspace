import { cookies } from 'next/headers';
import { Account, Client, Databases, Query } from 'node-appwrite';
import { AUTH_COOKIE } from '../auth/constants';
import { DATABASE_ID, MEMBERS_ID, WORKSPACE_ID } from '@/config';

export const getWorkspaces = async () => {
  try {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

    const session = cookies().get(AUTH_COOKIE);
    if (!session || !session.value) {
      return { documents: [] as any[], total: 0 };
    }

    client.setSession(session.value);
    const databases = new Databases(client);
    const account = new Account(client);
    const user = await account.get();
    const members = await databases.listDocuments(DATABASE_ID, MEMBERS_ID, [
      Query.equal('userId', user.$id),
    ]);

    if (members.total === 0) {
      return { documents: [] as any[], total: 0 };
    }

    const workspaceIds = members.documents.map((member) => member.workspaceId);

    const data = await databases.listDocuments(DATABASE_ID, WORKSPACE_ID, [
      Query.orderDesc('$createdAt'),
      Query.contains('$id', workspaceIds),
    ]);
    return data;
  } catch (error) {
    return { documents: [] as any[], total: 0 };
  }
};
