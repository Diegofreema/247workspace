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

export const createWorkspaceDocumentSchema = z.object({
  name: z.string().min(1, { message: 'Document name is required' }),
  documentUrl: z.union([
    z.instanceof(File),
    z
      .string()
      .min(1, { message: 'Document is required' })
      .transform((value) => (value === '' ? undefined : value)),
  ]),
  workspaceId: z.string(),
  folderId: z.string(),
  uploadedBy: z.string(),
});
export const createProjectDocumentSchema = z.object({
  name: z.string().min(1, { message: 'Document name is required' }),
  documentUrl: z.union([
    z.instanceof(File),
    z
      .string()
      .min(1, { message: 'Document is required' })
      .transform((value) => (value === '' ? undefined : value)),
  ]),
  projectId: z.string(),
  workspaceId: z.string(),
  folderId: z.string(),
  uploadedBy: z.string(),
});
export const createFolderSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: 'Folder name is required',
    })
    .max(50, { message: 'Folder name must be less than 50 characters' }),
  workspaceId: z.string(),
});
export const createProjectFolderSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: 'Folder name is required',
    })
    .max(50, { message: 'Folder name must be less than 50 characters' }),
  projectId: z.string(),
});
export const editProjectFolderSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: 'Folder name is required',
    })
    .max(50, { message: 'Folder name must be less than 50 characters' }),
});

export const editFolderSchema = createFolderSchema.omit({ workspaceId: true });
