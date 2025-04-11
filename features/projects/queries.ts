import { DATABASE_ID, PROJECT_ID } from '@/config';
import { createSessionClient } from '@/lib/appwrite';
import { Project } from '@/types';
import { getMember } from '../members/utils';

export const getProject = async ({ projectId }: { projectId: string }) => {
  const { account, databases } = await createSessionClient();

  const user = await account.get();
  const project = await databases.getDocument<Project>(
    DATABASE_ID,
    PROJECT_ID,
    projectId
  );
  const members = await getMember({
    databases,
    userId: user.$id,
    workspaceId: project.workspaceId,
  });

  if (!members) {
    throw new Error('Failed to get project');
  }

  return project;
};
