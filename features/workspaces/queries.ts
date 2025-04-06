import { Query } from 'node-appwrite';
import { DATABASE_ID, MEMBERS_ID, WORKSPACE_ID } from '@/config';
import { getMember } from '../members/utils';
import { Workspace } from '@/types';
import { createSessionClient } from '@/lib/appwrite';

export const getWorkspaces = async () => {
  try {
    const { account, databases } = await createSessionClient();
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
export const getWorkspace = async ({
  workspaceId,
}: {
  workspaceId: string;
}) => {
  try {
    const { account, databases } = await createSessionClient();

    const user = await account.get();
    const members = await getMember({
      databases,
      userId: user.$id,
      workspaceId,
    });

    if (!members) {
      return null;
    }

    return await databases.getDocument<Workspace>(
      DATABASE_ID,
      WORKSPACE_ID,
      workspaceId
    );
  } catch (error) {
    return null;
  }
};
