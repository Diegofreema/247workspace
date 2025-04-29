import { z } from 'zod';

export const commentSchema = z.object({
  comment: z.string().min(1, 'Comment is required').max(200, {message: 'Comment must be at most 200 characters'}),
  authorId: z.string(),
});
