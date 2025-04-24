'use server';

import { DATABASE_ID, MEMBERS_ID, PROFILE_ID, WORKSPACE_ID } from '@/config';
import { createSessionClient } from '@/lib/appwrite';
import { Profile, Workspace } from '@/types';
import { Query } from 'node-appwrite';

export const getLoggedInUser = async () => {
  try {
    const { account, databases } = await createSessionClient();

    const user = await account.get();
    const profiles = await databases.listDocuments<Profile>(
      DATABASE_ID,
      PROFILE_ID,
      [Query.equal('userId', user.$id)]
    );
    const profile = profiles.documents[0];
    const members = await databases.listDocuments(DATABASE_ID, MEMBERS_ID, [
      Query.equal('userId', user.$id),
    ]);
    let workspaces;
    if (members.total === 0) {
      workspaces = { documents: [] as any[], total: 0 };
    }

    const workspaceIds = members.documents.map((member) => member.workspaceId);

    workspaces = await databases.listDocuments<Workspace>(
      DATABASE_ID,
      WORKSPACE_ID,
      [Query.orderDesc('$createdAt'), Query.contains('$id', workspaceIds)]
    );

    return { profile, user, workspaces };
  } catch (error) {
    console.log(error);

    return {
      profile: null,
      user: null,
      workspaces: { documents: [] as any[], total: 0 },
    };
  }
};
