'use server';
import { createSessionClient } from '@/lib/appwrite';
import { getMember } from '../members/utils';
import { redirect } from 'next/navigation';
import { Query } from 'node-appwrite';
import { Project, TaskType } from '@/types';
import { DATABASE_ID, MEMBERS_ID, PROJECT_ID, TASK_ID } from '@/config';
import { getProfile } from '../workspaces/queries';

export const getTasks = async (workspaceId: string, projectId: string) => {
  const { account, databases } = await createSessionClient();
  const user = await account.get();
  try {
    const member = await getMember({
      databases,
      userId: user.$id,
      workspaceId,
    });
    if (!member) {
      redirect('/');
    }

    const query = [
      Query.equal('workspaceId', workspaceId),
      Query.equal('projectId', projectId),
      Query.orderDesc('$createdAt'),
    ];

    const tasks = await databases.listDocuments<TaskType>(
      DATABASE_ID,
      TASK_ID,
      query
    );

    const projectIds = tasks.documents.map((task) => task.projectId);
    const assigneeIds = tasks.documents.map((task) => task.assigneeId);
    const projects = await databases.listDocuments<Project>(
      DATABASE_ID,
      PROJECT_ID,
      projectIds.length > 0 ? [Query.contains('$id', projectIds)] : []
    );
    const members = await databases.listDocuments(
      DATABASE_ID,
      MEMBERS_ID,
      assigneeIds.length > 0 ? [Query.contains('$id', assigneeIds)] : []
    );

    const assignees = await Promise.all(
      members.documents.map(async (member) => {
        const user = await getProfile(member.$id);
        return {
          ...member,
          name: user?.name,
          email: user?.email,
        };
      })
    );

    const populatedTasks = tasks.documents.map((task) => {
      const project = projects.documents.find(
        (project) => project.$id === task.projectId
      );
      const assignee = assignees.find(
        (assignee) => assignee.$id === task.assigneeId
      );

      return {
        ...task,
        project,
        assignee,
      };
    });

    return {
      ...tasks,
      documents: populatedTasks,
    };
  } catch (error) {
    throw new Error('Something went wrong');
  }
};
