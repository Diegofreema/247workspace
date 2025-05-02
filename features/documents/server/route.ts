import {
  DATABASE_ID,
  DOCUMENT_ID,
  IMAGES_BUCKET_ID,
  PROJECT_DOCUMENT_FOLDER_ID,
  PROJECT_ID,
  VIEW_URL,
  WORKSPACE_DOCUMENT_FOLDER_ID,
  WORKSPACE_DOCUMENT_ID,
  WORKSPACE_ID,
} from '@/config';
import { getMember } from '@/features/members/utils';
import { sessionMiddleware } from '@/lib/session-middleware';
import {
  Project,
  ProjectDocumentType,
  ProjectFolderType,
  WorkspaceDocumentType,
  WorkspaceFolderType,
} from '@/types';
import { generateRandomString } from '@/utils/helper';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { ID, Query } from 'node-appwrite';
import { z } from 'zod';
import {
  createDocumentSchema,
  createFolderSchema,
  createProjectFolderSchema,
  createWorkspaceDocumentSchema,
  editFolderSchema,
  editProjectFolderSchema,
} from '../schema';

const app = new Hono()
  .get(
    '/:workspaceId',
    sessionMiddleware,
    zValidator(
      'query',
      z.object({ searchQuery: z.string().nullish(), more: z.string() })
    ),
    async (c) => {
      const databases = c.get('databases');
      const { workspaceId } = c.req.param();
      const { more, searchQuery } = c.req.valid('query');
      const limit = 25;
      const offset = limit + Number(more);
      const query = [
        Query.equal('workspaceId', workspaceId),
        Query.orderDesc('$createdAt'),
        Query.limit(offset),
      ];

      if (searchQuery) {
        query.push(Query.search('folderName', searchQuery));
      }

      const workspaceFolder =
        await databases.listDocuments<WorkspaceFolderType>(
          DATABASE_ID,
          WORKSPACE_DOCUMENT_FOLDER_ID,
          query
        );

      return c.json({ data: workspaceFolder });
    }
  )
  .get(
    '/get-project-folder',
    sessionMiddleware,
    zValidator(
      'query',
      z.object({
        searchQuery: z.string().nullish(),
        more: z.string(),
        projectId: z.string(),
      })
    ),
    async (c) => {
      const databases = c.get('databases');
      const { more, searchQuery, projectId } = c.req.valid('query');
      const limit = 25;
      const offset = limit + Number(more);
      const query = [
        Query.equal('projectId', projectId),
        Query.orderDesc('$createdAt'),
        Query.limit(offset),
      ];

      if (searchQuery) {
        query.push(Query.search('folderName', searchQuery));
      }

      const projectFolders = await databases.listDocuments<ProjectFolderType>(
        DATABASE_ID,
        PROJECT_DOCUMENT_FOLDER_ID,
        query
      );
      const workspaceFolder =
        await databases.listDocuments<WorkspaceFolderType>(
          DATABASE_ID,
          WORKSPACE_DOCUMENT_FOLDER_ID
        );
      return c.json({ data: workspaceFolder });
    }
  )
  .get(
    '/get-project-folder/:projectId',
    sessionMiddleware,
    zValidator(
      'query',
      z.object({ searchQuery: z.string().nullish(), more: z.string() })
    ),
    async (c) => {
      const databases = c.get('databases');
      const { projectId } = c.req.param();
      const { searchQuery, more } = c.req.valid('query');
      const limit = 25;
      const offset = limit + Number(more);
      const query = [
        Query.equal('projectId', projectId),
        Query.orderDesc('$createdAt'),
        Query.limit(offset),
      ];
      if (searchQuery) {
        query.push(Query.search('folderName', searchQuery));
      }
      const projectFolder = await databases.listDocuments<ProjectFolderType>(
        DATABASE_ID,
        PROJECT_DOCUMENT_FOLDER_ID,
        query
      );

      return c.json({ data: projectFolder });
    }
  )
  .post(
    '/',
    sessionMiddleware,
    zValidator('form', createDocumentSchema),
    async (c) => {
      const databases = c.get('databases');
      const user = c.get('user');
      const storage = c.get('storage');
      const { name, documentUrl, workspaceId, projectId, uploadedBy } =
        c.req.valid('form');

      try {
        let link: string | undefined;
        let id: string | undefined;
        if (documentUrl instanceof File) {
          const file = await storage.createFile(
            IMAGES_BUCKET_ID,
            ID.unique(),
            documentUrl
          );
          id = file.$id;
          link = `${VIEW_URL}/${IMAGES_BUCKET_ID}/files/${file.$id}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT}&mode=admin`;
        }

        const member = await getMember({
          databases,
          userId: user.$id,
          workspaceId,
        });

        if (!member) {
          return c.json(
            {
              error: 'Unauthorized',
            },
            401
          );
        }

        const document = await databases.createDocument<ProjectDocumentType>(
          DATABASE_ID,
          DOCUMENT_ID,
          ID.unique(),
          {
            name,
            workspaceId,
            projectId,
            uploadedBy,
            documentUrl: link,
            fileId: id,
            isCurrent: true,
            version: 1,
          }
        );

        return c.json({
          data: document,
        });
      } catch (error) {
        return c.json(
          {
            error: 'Something went wrong, please try again',
          },
          500
        );
      }
    }
  )
  .post(
    '/create-workspace-document',
    sessionMiddleware,
    zValidator('form', createWorkspaceDocumentSchema),
    async (c) => {
      const databases = c.get('databases');
      const user = c.get('user');
      const storage = c.get('storage');
      const { name, documentUrl, workspaceId, uploadedBy, folderId } =
        c.req.valid('form');

      let link: string | undefined;
      let id: string | undefined;
      if (documentUrl instanceof File) {
        const file = await storage.createFile(
          IMAGES_BUCKET_ID,
          ID.unique(),
          documentUrl
        );
        id = file.$id;
        link = `${VIEW_URL}/${IMAGES_BUCKET_ID}/files/${file.$id}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT}&mode=admin`;
      }

      const member = await getMember({
        databases,
        userId: user.$id,
        workspaceId,
      });

      if (!member) {
        return c.json(
          {
            error: 'Unauthorized',
          },
          401
        );
      }

      const documentExist =
        await databases.listDocuments<WorkspaceDocumentType>(
          DATABASE_ID,
          WORKSPACE_DOCUMENT_ID,
          [Query.equal('name', name), Query.equal('workspaceId', workspaceId)]
        );

      if (documentExist.documents.length > 0) {
        return c.json(
          {
            error:
              'Document with name already exists, please choose a different name',
          },
          400
        );
      }

      const document = await databases.createDocument<WorkspaceDocumentType>(
        DATABASE_ID,
        WORKSPACE_DOCUMENT_ID,
        ID.unique(),
        {
          name,
          workspaceId,
          folderId,
          uploadedBy,
          documentUrl: link,
          fileId: id,
          isCurrent: true,
          version: 1,
          versionId: id + generateRandomString(10),
        }
      );

      return c.json({
        data: document,
      });
    }
  )
  .post(
    '/create-project-document',
    sessionMiddleware,
    zValidator('form', createWorkspaceDocumentSchema),
    async (c) => {
      const databases = c.get('databases');
      const user = c.get('user');
      const storage = c.get('storage');
      const { name, documentUrl, workspaceId, uploadedBy, folderId } =
        c.req.valid('form');

      let link: string | undefined;
      let id: string | undefined;
      if (documentUrl instanceof File) {
        const file = await storage.createFile(
          IMAGES_BUCKET_ID,
          ID.unique(),
          documentUrl
        );
        id = file.$id;
        link = `${VIEW_URL}/${IMAGES_BUCKET_ID}/files/${file.$id}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT}&mode=admin`;
      }

      const member = await getMember({
        databases,
        userId: user.$id,
        workspaceId,
      });

      if (!member) {
        return c.json(
          {
            error: 'Unauthorized',
          },
          401
        );
      }

      const documentExist =
        await databases.listDocuments<WorkspaceDocumentType>(
          DATABASE_ID,
          WORKSPACE_DOCUMENT_ID,
          [Query.equal('name', name), Query.equal('workspaceId', workspaceId)]
        );

      if (documentExist.documents.length > 0) {
        return c.json(
          {
            error:
              'Document with name already exists, please choose a different name',
          },
          400
        );
      }

      const document = await databases.createDocument<WorkspaceDocumentType>(
        DATABASE_ID,
        WORKSPACE_DOCUMENT_ID,
        ID.unique(),
        {
          name,
          workspaceId,
          folderId,
          uploadedBy,
          documentUrl: link,
          fileId: id,
          isCurrent: true,
          version: 1,
          versionId: id + generateRandomString(10),
        }
      );

      return c.json({
        data: document,
      });
    }
  )
  .get('/:documentId', sessionMiddleware, async (c) => {
    const databases = c.get('databases');

    const { documentId } = c.req.param();

    const document = await databases.getDocument<ProjectDocumentType>(
      DATABASE_ID,
      DOCUMENT_ID,
      documentId
    );
    if (!document) {
      return c.json(
        {
          error: 'Document not found',
        },
        404
      );
    }
    return c.json({
      data: {
        document,
      },
    });
  })
  .delete('/:documentId', sessionMiddleware, async (c) => {
    const databases = c.get('databases');
    const storage = c.get('storage');
    const user = c.get('user');
    const { documentId } = c.req.param();
    const document = await databases.getDocument<ProjectDocumentType>(
      DATABASE_ID,
      DOCUMENT_ID,
      documentId
    );

    if (!document) {
      return c.json(
        {
          error: 'Document not found',
        },
        404
      );
    }

    const member = await getMember({
      databases,
      userId: user.$id,
      workspaceId: document.workspaceId,
    });
    if (!member) {
      return c.json(
        {
          error: 'Unauthorized',
        },
        401
      );
    }
    await databases.deleteDocument(DATABASE_ID, DOCUMENT_ID, documentId);
    await storage.deleteFile(IMAGES_BUCKET_ID, documentId);
    return c.json({
      data: documentId,
    });
  })
  .post(
    '/create-folder',
    sessionMiddleware,
    zValidator('json', createFolderSchema),
    async (c) => {
      const databases = c.get('databases');
      const { name, workspaceId } = c.req.valid('json');
      const workspace = await databases.getDocument(
        DATABASE_ID,
        WORKSPACE_ID,
        workspaceId
      );
      if (!workspace) {
        return c.json(
          {
            error: 'Workspace not found',
          },
          404
        );
      }
      const member = await getMember({
        databases,
        userId: c.get('user').$id,
        workspaceId,
      });
      if (!member) {
        return c.json(
          {
            error: 'Unauthorized',
          },
          401
        );
      }
      const folderExists = await databases.listDocuments(
        DATABASE_ID,
        WORKSPACE_DOCUMENT_FOLDER_ID,
        [
          Query.equal('folderName', name),
          Query.equal('workspaceId', workspaceId),
        ]
      );
      if (folderExists.documents.length > 0) {
        return c.json(
          {
            error:
              'Folder with name already exists, please choose a different name',
          },
          400
        );
      }

      const folder = await databases.createDocument(
        DATABASE_ID,
        WORKSPACE_DOCUMENT_FOLDER_ID,
        ID.unique(),
        {
          folderName: name,
          workspaceId,
        }
      );

      return c.json({
        data: folder,
      });
    }
  )
  .post(
    '/create-project-folder',
    sessionMiddleware,
    zValidator('json', createProjectFolderSchema),
    async (c) => {
      const databases = c.get('databases');
      const { name, projectId } = c.req.valid('json');

      const project = await databases.getDocument<Project>(
        DATABASE_ID,
        PROJECT_ID,
        projectId
      );
      const member = await getMember({
        databases,
        userId: c.get('user').$id,
        workspaceId: project.workspaceId,
      });
      if (!member) {
        return c.json(
          {
            error: 'Unauthorized',
          },
          401
        );
      }
      const folderExists = await databases.listDocuments(
        DATABASE_ID,
        PROJECT_DOCUMENT_FOLDER_ID,
        [Query.equal('folderName', name), Query.equal('projectId', projectId)]
      );
      if (folderExists.documents.length > 0) {
        return c.json(
          {
            error:
              'Folder with name already exists, please choose a different name',
          },
          400
        );
      }

      const folder = await databases.createDocument(
        DATABASE_ID,
        PROJECT_DOCUMENT_FOLDER_ID,
        ID.unique(),
        {
          folderName: name,
          projectId,
        }
      );

      return c.json({
        data: folder,
      });
    }
  )
  .patch(
    '/:folderId',
    sessionMiddleware,
    zValidator('json', editFolderSchema),
    async (c) => {
      const databases = c.get('databases');
      const { folderId } = c.req.param();
      const { name } = c.req.valid('json');
      const folder = await databases.getDocument<WorkspaceFolderType>(
        DATABASE_ID,
        WORKSPACE_DOCUMENT_FOLDER_ID,
        folderId
      );
      if (!folder) {
        return c.json(
          {
            error: 'Folder not found',
          },
          404
        );
      }
      const member = await getMember({
        databases,
        userId: c.get('user').$id,
        workspaceId: folder.workspaceId,
      });
      if (!member) {
        return c.json(
          {
            error: 'Unauthorized',
          },
          401
        );
      }

      await databases.updateDocument(
        DATABASE_ID,
        WORKSPACE_DOCUMENT_FOLDER_ID,
        folderId,
        {
          folderName: name,
        }
      );

      return c.json({
        data: folder,
      });
    }
  )
  .patch(
    '/project-folder/:folderId',
    sessionMiddleware,
    zValidator('json', editProjectFolderSchema),
    async (c) => {
      const databases = c.get('databases');
      const { folderId } = c.req.param();
      const { name } = c.req.valid('json');

      const folder = await databases.getDocument<ProjectFolderType>(
        DATABASE_ID,
        PROJECT_DOCUMENT_FOLDER_ID,
        folderId
      );
      const folderExists = await databases.listDocuments(
        DATABASE_ID,
        PROJECT_DOCUMENT_FOLDER_ID,
        [
          Query.equal('folderName', name),
          Query.equal('projectId', folder.projectId),
        ]
      );
      if (folderExists.documents.length > 0) {
        return c.json(
          {
            error:
              'Folder with name already exists, please choose a different name',
          },
          400
        );
      }
      const project = await databases.getDocument<Project>(
        DATABASE_ID,
        PROJECT_ID,
        folder.projectId
      );
      if (!folder) {
        return c.json(
          {
            error: 'Folder not found',
          },
          404
        );
      }
      const member = await getMember({
        databases,
        userId: c.get('user').$id,
        workspaceId: project.workspaceId,
      });
      if (!member) {
        return c.json(
          {
            error: 'Unauthorized',
          },
          401
        );
      }

      await databases.updateDocument(
        DATABASE_ID,
        PROJECT_DOCUMENT_FOLDER_ID,
        folderId,
        {
          folderName: name,
        }
      );

      return c.json({
        data: folder,
      });
    }
  )
  .get(
    '/workspace-documents/:folderId',
    sessionMiddleware,
    zValidator('query', z.object({ page: z.string() })),
    async (c) => {
      const databases = c.get('databases');

      const { folderId } = c.req.param();
      const { page } = c.req.valid('query');
      const pageNumber = Number(page);
      const limit = 25;
      const offset = (pageNumber - 1) * limit;
      const documents = await databases.listDocuments<WorkspaceDocumentType>(
        DATABASE_ID,
        WORKSPACE_DOCUMENT_ID,
        [
          Query.equal('folderId', folderId),
          Query.orderDesc('$createdAt'),
          Query.equal('isCurrent', true),
          Query.limit(limit),
          Query.offset(offset),
        ]
      );

      return c.json({
        data: documents,
      });
    }
  )
  .get(
    '/version-history/:versionId',
    sessionMiddleware,
    zValidator('query', z.object({ page: z.string() })),
    async (c) => {
      const databases = c.get('databases');
      const { versionId } = c.req.param();
      const { page } = c.req.valid('query');
      const pageNumber = Number(page);
      const limit = 25;
      const offset = (pageNumber - 1) * limit;

      const documents = await databases.listDocuments<WorkspaceDocumentType>(
        DATABASE_ID,
        WORKSPACE_DOCUMENT_ID,
        [
          Query.equal('versionId', versionId),
          Query.orderDesc('$createdAt'),
          Query.limit(limit),
          Query.offset(offset),
        ]
      );

      return c.json({
        data: documents,
      });
    }
  )
  .post(
    '/upload-new-version/:versionId',
    sessionMiddleware,
    zValidator('form', createWorkspaceDocumentSchema.partial()),
    async (c) => {
      const databases = c.get('databases');
      const storage = c.get('storage');
      const user = c.get('user');
      const { versionId } = c.req.param();
      const { documentUrl, workspaceId, uploadedBy } = c.req.valid('form');
      const member = await getMember({
        databases,
        userId: user.$id,
        workspaceId: workspaceId!,
      });

      if (!member) {
        return c.json(
          {
            error: 'Unauthorized, you are not a member of this workspace',
          },
          401
        );
      }
      let link: string | undefined;
      let id: string | undefined;
      if (documentUrl instanceof File) {
        const file = await storage.createFile(
          IMAGES_BUCKET_ID,
          ID.unique(),
          documentUrl
        );
        id = file.$id;
        link = `${VIEW_URL}/${IMAGES_BUCKET_ID}/files/${file.$id}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT}&mode=admin`;
      }

      const previousDocuments =
        await databases.listDocuments<WorkspaceDocumentType>(
          DATABASE_ID,
          WORKSPACE_DOCUMENT_ID,
          [
            Query.equal('versionId', versionId),
            Query.orderDesc('$createdAt'),
            Query.limit(1),
          ]
        );
      const previousDocument = previousDocuments.documents[0];
      const previousDocumentVersion =
        previousDocuments.documents.length > 0
          ? previousDocuments.documents[0].version
          : 1;

      await databases.updateDocument(
        DATABASE_ID,
        WORKSPACE_DOCUMENT_ID,
        previousDocument.$id,
        {
          isCurrent: false,
        }
      );

      const document = await databases.createDocument<WorkspaceDocumentType>(
        DATABASE_ID,
        WORKSPACE_DOCUMENT_ID,
        ID.unique(),
        {
          name: previousDocument.name,
          workspaceId,
          folderId: previousDocument.folderId,
          uploadedBy,
          documentUrl: link,
          fileId: id,
          isCurrent: true,
          version: previousDocumentVersion + 1,
          versionId: previousDocument.versionId,
        }
      );

      return c.json({
        data: document,
      });
    }
  );

export default app;
