import { Models } from 'node-appwrite';

export enum MemberRole {
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
  CHIEF_ADMIN = 'CHIEF_ADMIN',
}

export type Workspace = Models.Document & {
  name: string;
  imageUrl: string;
  inviteCode: string;
  userId: string;
};
export type Member = Models.Document & {
  role: MemberRole;
  userId: string;
  workspaceId: string;
};
