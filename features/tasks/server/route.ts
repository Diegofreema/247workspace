import { sessionMiddleware } from '@/lib/session-middleware';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { createTaskSchema } from '../schema';
import { getMember } from '@/features/members/utils';
import { DATABASE_ID, MEMBERS_ID, PROJECT_ID, TASK_ID } from '@/config';
import { ID, Query } from 'node-appwrite';
import { z } from 'zod';
import { Project, StatusEnum, TaskType } from '@/types';
import { getProfile } from '@/features/workspaces/queries';

const app = new Hono()
  .delete('/:taskId', sessionMiddleware, async (c) => {
    const user = c.get('user');
    const databases = c.get('databases');
    const { taskId } = c.req.param();
    const task = await databases.getDocument<TaskType>(
      DATABASE_ID,
      TASK_ID,
      taskId
    );
    const member = await getMember({
      databases,
      userId: user.$id,
      workspaceId: task.workspaceId,
    });
    if (!member) {
      return c.json({ error: 'You are not a member of this workspace' }, 401);
    }
    await databases.deleteDocument(DATABASE_ID, TASK_ID, taskId);
    return c.json({ data: { $id: task.$id } });
  })
  .post(
    '/',
    sessionMiddleware,
    zValidator('json', createTaskSchema),
    async (c) => {
      const user = c.get('user');
      const databases = c.get('databases');
      const {
        name,
        description,
        projectId,
        workspaceId,
        assigneeId,
        status,
        priority,
        dueDate,
      } = c.req.valid('json');
      const member = await getMember({
        databases,
        userId: user.$id,
        workspaceId,
      });

      if (!member) {
        return c.json({ error: 'You are not a member of this workspace' }, 401);
      }

      const highestTask = await databases.listDocuments(DATABASE_ID, TASK_ID, [
        Query.equal('status', status),
        Query.equal('workspaceId', workspaceId),
        Query.orderAsc('position'),
        Query.limit(1),
      ]);
      const newPosition =
        highestTask.documents.length > 0
          ? highestTask.documents[0].position + 1000
          : 1000;

      const task = await databases.createDocument(
        DATABASE_ID,
        TASK_ID,
        ID.unique(),
        {
          name,
          description,
          projectId,
          workspaceId,
          assigneeId,
          status,
          priority,
          dueDate,
          position: newPosition,
        }
      );
      return c.json({ data: task });
    }
  )
  .get(
    '/',
    sessionMiddleware,
    zValidator(
      'query',
      z.object({
        workspaceId: z.string(),
        projectId: z.string().nullish(),
        assigneeId: z.string().nullish(),
        status: z.nativeEnum(StatusEnum).nullish(),
        search: z.string().nullish(),
        dueDate: z.string().nullish(),
      })
    ),
    async (c) => {
      const user = c.get('user');
      const databases = c.get('databases');
      const { workspaceId, projectId, assigneeId, status, search, dueDate } =
        c.req.valid('query');

      try {
        const member = await getMember({
          databases,
          userId: user.$id,
          workspaceId,
        });
        if (!member) {
          return c.json(
            { error: 'You are not a member of this workspace' },
            401
          );
        }

        const query = [
          Query.equal('workspaceId', workspaceId),
          Query.orderDesc('$createdAt'),
        ];

        if (projectId) {
          query.push(Query.equal('projectId', projectId));
        }
        if (assigneeId) {
          query.push(Query.equal('assigneeId', assigneeId));
        }
        if (status) {
          query.push(Query.equal('status', status));
        }
        if (search) {
          query.push(Query.search('name', search));
        }

        if (dueDate) {
          query.push(Query.equal('dueDate', dueDate));
        }

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
            const user = await getProfile(member.userId);
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
        return c.json({
          data: {
            ...tasks,
            documents: populatedTasks,
          },
        });
      } catch (error) {
        console.log(error);
        throw new Error('Failed to get tasks');
      }
    }
  );

export default app;
