import {
  DATABASE_ID,
  IMAGES_BUCKET_ID,
  MEMBERS_ID,
  PROJECT_ID,
  TASK_ID,
} from '@/config';
import { getMember } from '@/features/members/utils';
import { getProfile } from '@/features/workspaces/queries';
import { sessionMiddleware } from '@/lib/session-middleware';
import { Member, Project, StatusEnum, TaskType } from '@/types';
import { zValidator } from '@hono/zod-validator';
import { endOfMonth, startOfMonth, subMonths } from 'date-fns';
import { Hono } from 'hono';
import { AppwriteException, ID, Query } from 'node-appwrite';
import { z } from 'zod';
import { createProjectSchema, editProjectSchema } from '../schema';

const app = new Hono()
  .get(
    '/',
    sessionMiddleware,
    zValidator('query', z.object({ workspaceId: z.string() })),
    async (c) => {
      const { workspaceId } = c.req.valid('query');
      const databases = c.get('databases');
      const user = c.get('user');
      const member = await getMember({
        databases,
        userId: user.$id,
        workspaceId,
      });
      if (!member) {
        return c.json(
          {
            error: 'Unauthorized',
          },
          401
        );
      }

      const projects = await databases.listDocuments<Project>(
        DATABASE_ID,
        PROJECT_ID,
        [Query.equal('workspaceId', workspaceId), Query.orderDesc('$createdAt')]
      );

      return c.json({
        data: projects,
      });
    }
  )
  .get(
    '/project-with-tasks',
    sessionMiddleware,
    zValidator(
      'query',
      z.object({ workspaceId: z.string(), offset: z.string() })
    ),
    async (c) => {
      const { workspaceId, offset } = c.req.valid('query');
      const databases = c.get('databases');
      const user = c.get('user');
      const member = await getMember({
        databases,
        userId: user.$id,
        workspaceId,
      });
      if (!member) {
        return c.json(
          {
            error: 'Unauthorized',
          },
          401
        );
      }
      console.log(offset);
      const offsetToNumber = +offset;
      const projects = await databases.listDocuments<Project>(
        DATABASE_ID,
        PROJECT_ID,
        [
          Query.equal('workspaceId', workspaceId),
          Query.orderDesc('$createdAt'),
          Query.limit(10 + offsetToNumber),
        ]
      );

      const projectsWithTasks = await Promise.all(
        projects.documents.map(async (project) => {
          const tasks = await databases.listDocuments<TaskType>(
            DATABASE_ID,
            TASK_ID,
            [Query.equal('projectId', project.$id)]
          );

          const tasksWithAssignee = await Promise.all(
            tasks.documents.map(async (task) => {
              const member = await databases.getDocument<Member>(
                DATABASE_ID,
                MEMBERS_ID,
                task.assigneeId
              );
              const user = await getProfile(member.userId);

              return {
                ...task,
                assignee: user,
              };
            })
          );

          return {
            ...project,
            tasks: tasksWithAssignee,
          };
        })
      );

      return c.json({
        data: {
          ...projects,
          documents: projectsWithTasks,
        },
      });
    }
  )
  .get('/:projectId', sessionMiddleware, async (c) => {
    const { projectId } = c.req.param();
    const databases = c.get('databases');
    const user = c.get('user');
    const project = await databases.getDocument<Project>(
      DATABASE_ID,
      PROJECT_ID,
      projectId
    );
    const member = await getMember({
      databases,
      userId: user.$id,
      workspaceId: project.workspaceId,
    });

    if (!member) {
      return c.json(
        {
          error: 'Unauthorized',
        },
        401
      );
    }
    return c.json({
      data: project,
    });
  })
  .post(
    '/',
    zValidator('form', createProjectSchema),
    sessionMiddleware,
    async (c) => {
      const databases = c.get('databases');
      const user = c.get('user');
      const storage = c.get('storage');
      const { name, image, workspaceId } = c.req.valid('form');

      const projectWithNameExists = await databases.listDocuments<Project>(
        DATABASE_ID,
        PROJECT_ID,
        [Query.equal('name', name), Query.equal('workspaceId', workspaceId)]
      );
      if (projectWithNameExists.total > 0) {
        return c.json(
          {
            error: 'Project with this name already exists',
          },
          400
        );
      }

      let uploadUrl: string | undefined;
      if (image instanceof File) {
        const file = await storage.createFile(
          IMAGES_BUCKET_ID,
          ID.unique(),
          image
        );

        const arrayBufferToBase64 = await storage.getFileView(
          file.bucketId,
          file.$id
        );
        uploadUrl = `data:image/png;base64,${Buffer.from(arrayBufferToBase64).toString('base64')}`;
      }
      try {
        const member = await getMember({
          databases,
          userId: user.$id,
          workspaceId,
        });

        if (!member) {
          return c.json(
            {
              error: 'Unauthorized',
            },
            401
          );
        }

        const project = await databases.createDocument<Project>(
          DATABASE_ID,
          PROJECT_ID,
          ID.unique(),
          {
            name,
            userId: user.$id,
            imageUrl: uploadUrl,
            workspaceId,
          }
        );

        return c.json({
          data: project,
        });
      } catch (error) {
        console.log(error);

        if (error instanceof AppwriteException) {
          let errorMessage = error.message;
          if (error.type === 'document_invalid_structure') {
            errorMessage = 'Missing a required field';
          }
          if (error.type === 'storage_invalid_file_size') {
            errorMessage = 'File size is too large, max 1mb';
          }
          return c.json(
            {
              error: errorMessage,
            },
            400
          );
        }
        return c.json(
          {
            error: 'Something went wrong, please try again',
          },
          500
        );
      }
    }
  )
  .patch(
    '/:projectId',
    sessionMiddleware,
    zValidator('form', editProjectSchema),
    async (c) => {
      const databases = c.get('databases');
      const storage = c.get('storage');
      const user = c.get('user');
      const { projectId } = c.req.param();
      const { name, image } = c.req.valid('form');
      const existingProject = await databases.getDocument<Project>(
        DATABASE_ID,
        PROJECT_ID,
        projectId
      );
      const member = await getMember({
        databases,
        workspaceId: existingProject.workspaceId,
        userId: user.$id,
      });

      if (!member) {
        return c.json(
          {
            error: 'Unauthorized',
          },
          401
        );
      }
      let uploadUrl: string | undefined;
      if (image instanceof File) {
        const file = await storage.createFile(
          IMAGES_BUCKET_ID,
          ID.unique(),
          image
        );

        const arrayBufferToBase64 = await storage.getFileView(
          file.bucketId,
          file.$id
        );
        uploadUrl = `data:image/png;base64,${Buffer.from(arrayBufferToBase64).toString('base64')}`;
      } else {
        uploadUrl = image;
      }

      const project = await databases.updateDocument<Project>(
        DATABASE_ID,
        PROJECT_ID,
        projectId,
        {
          name,
          imageUrl: uploadUrl,
        }
      );

      return c.json({
        data: project,
      });
    }
  )
  .delete('/:projectId', sessionMiddleware, async (c) => {
    const { projectId } = c.req.param();
    const databases = c.get('databases');
    const user = c.get('user');
    const project = await databases.getDocument<Project>(
      DATABASE_ID,
      PROJECT_ID,
      projectId
    );
    const member = await getMember({
      databases,
      userId: user.$id,
      workspaceId: project.workspaceId,
    });
    if (!member) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    await databases.deleteDocument(DATABASE_ID, PROJECT_ID, projectId);
    const tasks = await databases.listDocuments<TaskType>(
      DATABASE_ID,
      TASK_ID,
      [Query.equal('projectId', projectId)]
    );

    await Promise.all(
      tasks.documents.map(async (task) => {
        await databases.deleteDocument(DATABASE_ID, TASK_ID, task.$id);
      })
    );
    return c.json({ data: { $id: projectId } });
  })
  .get('/:projectId/analytics', sessionMiddleware, async (c) => {
    const { projectId } = c.req.param();
    const databases = c.get('databases');
    const user = c.get('user');
    const project = await databases.getDocument<Project>(
      DATABASE_ID,
      PROJECT_ID,
      projectId
    );
    const member = await getMember({
      databases,
      userId: user.$id,
      workspaceId: project.workspaceId,
    });

    if (!member) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const now = new Date();
    const thisMonthStart = startOfMonth(now);
    const thisMonthEnd = endOfMonth(now);
    const lastMonthStart = startOfMonth(subMonths(now, 1));
    const lastMonthEnd = endOfMonth(subMonths(now, 1));
    const thisMonthTasks = await databases.listDocuments<TaskType>(
      DATABASE_ID,
      TASK_ID,
      [
        Query.equal('projectId', projectId),
        Query.greaterThan('$createdAt', thisMonthStart.toISOString()),
        Query.lessThan('$createdAt', thisMonthEnd.toISOString()),
      ]
    );
    const lastMonthTasks = await databases.listDocuments<TaskType>(
      DATABASE_ID,
      TASK_ID,
      [
        Query.equal('projectId', projectId),
        Query.greaterThan('$createdAt', lastMonthStart.toISOString()),
        Query.lessThan('$createdAt', lastMonthEnd.toISOString()),
      ]
    );
    const taskCount = thisMonthTasks.total;
    const taskDifference = taskCount - lastMonthTasks.total;

    const thisMonthAssignedTasks = await databases.listDocuments<TaskType>(
      DATABASE_ID,
      TASK_ID,
      [
        Query.equal('projectId', projectId),
        Query.equal('assigneeId', member.$id),
        Query.greaterThan('$createdAt', thisMonthStart.toISOString()),
        Query.lessThan('$createdAt', thisMonthEnd.toISOString()),
      ]
    );
    const lastMonthAssignedTasks = await databases.listDocuments<TaskType>(
      DATABASE_ID,
      TASK_ID,
      [
        Query.equal('projectId', projectId),
        Query.equal('assigneeId', member.$id),
        Query.greaterThan('$createdAt', lastMonthStart.toISOString()),
        Query.lessThan('$createdAt', lastMonthEnd.toISOString()),
      ]
    );
    const assignedTaskCount = thisMonthAssignedTasks.total;
    const assignedTaskDifference =
      assignedTaskCount - lastMonthAssignedTasks.total;
    const thisMonthIncompleteTasks = await databases.listDocuments<TaskType>(
      DATABASE_ID,
      TASK_ID,
      [
        Query.equal('projectId', projectId),
        Query.notEqual('status', StatusEnum.DONE),
        Query.greaterThan('$createdAt', thisMonthStart.toISOString()),
        Query.lessThan('$createdAt', thisMonthEnd.toISOString()),
      ]
    );
    const lastMonthIncompleteTasks = await databases.listDocuments<TaskType>(
      DATABASE_ID,
      TASK_ID,
      [
        Query.equal('projectId', projectId),
        Query.notEqual('status', StatusEnum.DONE),
        Query.greaterThan('$createdAt', lastMonthStart.toISOString()),
        Query.lessThan('$createdAt', lastMonthEnd.toISOString()),
      ]
    );
    const incompleteTaskCount = thisMonthIncompleteTasks.total;
    const incompleteTaskDifference =
      incompleteTaskCount - lastMonthIncompleteTasks.total;
    const thisMonthCompletedTasks = await databases.listDocuments<TaskType>(
      DATABASE_ID,
      TASK_ID,
      [
        Query.equal('projectId', projectId),
        Query.equal('status', StatusEnum.DONE),
        Query.greaterThan('$createdAt', thisMonthStart.toISOString()),
        Query.lessThan('$createdAt', thisMonthEnd.toISOString()),
      ]
    );
    const lastMonthCompletedTasks = await databases.listDocuments<TaskType>(
      DATABASE_ID,
      TASK_ID,
      [
        Query.equal('projectId', projectId),
        Query.equal('status', StatusEnum.DONE),
        Query.greaterThan('$createdAt', lastMonthStart.toISOString()),
        Query.lessThan('$createdAt', lastMonthEnd.toISOString()),
      ]
    );
    const completedTaskCount = thisMonthCompletedTasks.total;
    const completedTaskDifference =
      completedTaskCount - lastMonthCompletedTasks.total;
    const thisMonthOverdueTasks = await databases.listDocuments<TaskType>(
      DATABASE_ID,
      TASK_ID,
      [
        Query.equal('projectId', projectId),
        Query.notEqual('status', StatusEnum.DONE),
        Query.lessThan('dueDate', now.toISOString()),
        Query.greaterThan('$createdAt', thisMonthStart.toISOString()),
        Query.lessThan('$createdAt', thisMonthEnd.toISOString()),
      ]
    );
    const lastMonthOverdueTasks = await databases.listDocuments<TaskType>(
      DATABASE_ID,
      TASK_ID,
      [
        Query.equal('projectId', projectId),
        Query.notEqual('status', StatusEnum.DONE),
        Query.lessThan('dueDate', now.toISOString()),
        Query.greaterThan('$createdAt', lastMonthStart.toISOString()),
        Query.lessThan('$createdAt', lastMonthEnd.toISOString()),
      ]
    );
    const overdueTaskCount = thisMonthOverdueTasks.total;
    const overdueTaskDifference =
      overdueTaskCount - lastMonthOverdueTasks.total;

    return c.json({
      data: {
        taskCount,
        taskDifference,
        assignedTaskCount,
        assignedTaskDifference,
        incompleteTaskCount,
        incompleteTaskDifference,
        completedTaskCount,
        completedTaskDifference,
        overdueTaskCount,
        overdueTaskDifference,
      },
    });
  });

export default app;
