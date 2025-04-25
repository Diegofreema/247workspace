import { z } from 'zod';

export const createFeedbackSchema = z.object({
  feedback: z.string().min(1, {
    message: 'Feedback is required',
  }),
  profileId: z.string(),
  taskId: z.string(),
});
