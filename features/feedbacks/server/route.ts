import { DATABASE_ID, PROFILE_ID, TASK_FEEDBACK_ID, TASK_ID } from '@/config';
import { getMember } from '@/features/members/utils';
import { sessionMiddleware } from '@/lib/session-middleware';
import { FeedbackType, Profile, TaskType } from '@/types';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { ID, Query } from 'node-appwrite';
import { z } from 'zod';
import { createFeedbackSchema } from '../schema';
import { getProfile } from '@/features/workspaces/queries';

const app = new Hono()
  .get(
    '/:taskId',
    sessionMiddleware,
    zValidator('param', z.object({ taskId: z.string() })),
    async (c) => {
      const { taskId } = c.req.valid('param');
      const databases = c.get('databases');
      const user = c.get('user');
      const task = await databases.getDocument<TaskType>(
        DATABASE_ID,
        TASK_ID,
        taskId
      );

      if (!task) {
        return c.json({ message: 'Task not found' }, 404);
      }
      const members = await getMember({
        databases,
        userId: user.$id,
        workspaceId: task.workspaceId,
      });

      if (!members) {
        return c.json({ error: 'Authorized' }, 400);
      }
      const feedbacks = await databases.listDocuments<FeedbackType>(
        DATABASE_ID,
        TASK_FEEDBACK_ID,
        [Query.equal('taskId', task.$id), Query.orderDesc('$createdAt')]
      );
      const feedbacksWitProfile = await Promise.all(
        feedbacks.documents.map(async (feedback) => {
          const profile = await databases.getDocument(
            DATABASE_ID,
            PROFILE_ID,
            feedback.profileId
          );
          return {
            ...feedback,
            profile: profile as Profile,
          };
        })
      );
      return c.json({ data: feedbacksWitProfile });
    }
  )
  .post(
    '/',
    sessionMiddleware,
    zValidator('json', createFeedbackSchema),
    async (c) => {
      const { feedback, taskId, profileId } = c.req.valid('json');
      const databases = c.get('databases');
      const user = c.get('user');

      const task = await databases.getDocument<TaskType>(
        DATABASE_ID,
        TASK_ID,
        taskId
      );
      if (!task) {
        return c.json({ message: 'Task not found' }, 404);
      }
      const members = await getMember({
        databases,
        userId: user.$id,
        workspaceId: task.workspaceId,
      });
      if (!members) {
        return c.json({ error: 'Unauthorized' }, 400);
      }

      const newFeedback = await databases.createDocument<FeedbackType>(
        DATABASE_ID,
        TASK_FEEDBACK_ID,
        ID.unique(),
        {
          feedback,
          profileId,
          taskId,
        }
      );
      return c.json({ data: newFeedback });
    }
  )
  .delete(
    '/:feedbackId',
    sessionMiddleware,
    zValidator('param', z.object({ feedbackId: z.string() })),
    async (c) => {
      const databases = c.get('databases');
      const user = c.get('user');
      const { feedbackId } = c.req.valid('param');

      const feedback = await databases.getDocument<FeedbackType>(
        DATABASE_ID,
        TASK_FEEDBACK_ID,
        feedbackId
      );

      if (!feedback) {
        return c.json({ error: 'No feedback found' }, 404);
      }

      const profile = await getProfile(user.$id);

      if (profile?.$id !== feedback.profileId) {
        return c.json({ error: 'Authorized' }, 400);
      }

      await databases.deleteDocument(
        DATABASE_ID,
        TASK_FEEDBACK_ID,
        feedback.$id
      );
      return c.json({
        data: feedbackId,
      });
    }
  )
  .patch(
    '/:feedbackId',
    sessionMiddleware,
    zValidator('json', z.object({ feedback: z.string() })),
    async (c) => {
      const databases = c.get('databases');
      const { feedback } = c.req.valid('json');
      const { feedbackId } = c.req.param();
      const user = c.get('user');
      const feedbackInDb = await databases.getDocument<FeedbackType>(
        DATABASE_ID,
        TASK_FEEDBACK_ID,
        feedbackId
      );

      if (!feedbackInDb) {
        return c.json({ error: 'No feedback found' }, 404);
      }

      const profile = await getProfile(user.$id);

      if (profile?.$id !== feedbackInDb.profileId) {
        return c.json({ error: 'Authorized' }, 400);
      }

      const updatedFeedback = await databases.updateDocument(
        DATABASE_ID,
        TASK_FEEDBACK_ID,
        feedbackId,
        {
          feedback,
        }
      );

      return c.json({ data: updatedFeedback });
    }
  );

export default app;
