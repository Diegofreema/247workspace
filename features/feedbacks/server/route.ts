import { DATABASE_ID, PROFILE_ID, TASK_FEEDBACK_ID, TASK_ID } from '@/config';
import { getMember } from '@/features/members/utils';
import { getProfile } from '@/features/workspaces/queries';
import { sessionMiddleware } from '@/lib/session-middleware';
import { FeedbackType, Profile, TaskType } from '@/types';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { User } from 'lucide-react';
import { Query } from 'node-appwrite';
import { z } from 'zod';

const app = new Hono().get(
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
);

export default app;
