import { PriorityEnum, StatusEnum } from '@/types';
import { z } from 'zod';

export const createTaskSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Task name is required' })
    .max(50, { message: 'Task name must be between 1 and 50 characters' }),
  description: z
    .string()
    .max(300, { message: 'Description should not be more than 255 characters' })
    .optional(),
  projectId: z.string().min(1, 'Required'),
  workspaceId: z.string().min(1, 'Required'),
  assigneeId: z.string().min(1, 'Required'),
  status: z.nativeEnum(StatusEnum, {
    required_error: 'Status is required',
    message: 'Status is required',
  }),
  priority: z.nativeEnum(PriorityEnum, {
    required_error: 'Priority is required',
    message: 'Priority is required',
  }),
  dueDate: z.coerce.date(),
});
export const editTaskSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Task name is required' })
    .max(50, { message: 'Task name must be between 1 and 50 characters' }),
  description: z
    .string()
    .max(255, { message: 'Description should not be more than 255 characters' })
    .optional(),
  projectId: z.string().min(1, 'Required'),

  assigneeId: z.string().min(1, 'Required'),
  status: z.nativeEnum(StatusEnum, {
    required_error: 'Status is required',
    message: 'Status is required',
  }),
  priority: z.nativeEnum(PriorityEnum, {
    required_error: 'Priority is required',
    message: 'Priority is required',
  }),
  dueDate: z.coerce.date(),
});
