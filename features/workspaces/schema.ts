import { z } from 'zod';

export const createWorkspaceSchema = z.object({
  name: z.string().min(1, {
    message: 'Workspace name is required',
  }),
  image: z
    .union([
      z.instanceof(File),
      z.string().transform((value) => (value === '' ? undefined : value)),
    ])
    .optional(),
});
export const editWorkspaceSchema = z.object({
  name: z.string().min(1, {
    message: 'Workspace name is required',
  }),
  image: z
    .union([
      z.instanceof(File),
      z.string().transform((value) => (value === '' ? undefined : value)),
    ])
    .optional(),
});
