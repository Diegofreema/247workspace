import { PriorityEnum, TicketStatus } from '@/types';
import { z } from 'zod';

export const createTicketSchema = z.object({
  subject: z.string().min(1, { message: 'Subject is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  assigneeId: z.string().min(1, { message: 'Assignee is required' }),
  raisedId: z.string(),
  workspaceId: z.string(),
  priority: z.nativeEnum(PriorityEnum, {
    required_error: 'Priority is required',
    message: 'Priority is required',
  }),
  status: z.nativeEnum(TicketStatus, {
    required_error: 'Status is required',
    message: 'Status is required',
  }),
});
