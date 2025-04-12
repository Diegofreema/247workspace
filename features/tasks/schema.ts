import { StatusEnum } from '@/types';
import { z } from 'zod';

export const createTaskSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Task name is required' })
    .max(50, { message: 'Task name must be between 1 and 50 characters' }),
  description: z.string().min(1).max(255).optional(),
  projectId: z.string().min(1, 'Required'),
  workspaceId: z.string().min(1, 'Required'),
  assigneeId: z.string().min(1, 'Required'),
  status: z.nativeEnum(StatusEnum, { required_error: 'Status is required' }),
  priority: z
    .number()
    .min(1, { message: 'Priority is required' })
    .max(5, { message: 'Priority must be between 1 and 5' }),
  dueDate: z.coerce.date(),
});
