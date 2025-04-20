import { z } from 'zod';

export const createDocumentSchema = z.object({
  name: z.string().min(1, { message: 'Document name is required' }),
  documentUrl: z.union([
    z.instanceof(File),
    z
      .string()
      .min(1, { message: 'Document is required' })
      .transform((value) => (value === '' ? undefined : value)),
  ]),
  workspaceId: z.string(),
  projectId: z.string(),
  uploadedBy: z.string(),
});
