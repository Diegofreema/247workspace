import { Query, type Databases } from 'node-appwrite';

import { DATABASE_ID, MEMBERS_ID } from '@/config';
import { Member } from '@/types';

type GetMemberProps = {
  databases: Databases;
  userId: string;
  workspaceId: string;
};

export const getMember = async ({
  databases,
  userId,
  workspaceId,
}: GetMemberProps) => {
  const members = await databases.listDocuments<Member>(
    DATABASE_ID,
    MEMBERS_ID,
    [Query.equal('workspaceId', workspaceId), Query.equal('userId', userId)]
  );

  return members.documents[0];
};
