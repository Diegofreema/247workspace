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
  memberRole: MemberRole;
  userId: string;
  workspaceId: string;
};
export type Profile = Models.Document & {
  userId: string;
  avatarUrl?: string;
  role: string;
  email: string;
  bio?: string;
  name: string;
};

export type MemberWithProfile = Member & {
  userId: string;
  avatarUrl?: string;
  role: string;
  email: string;
  bio?: string;
  name: string;
};
