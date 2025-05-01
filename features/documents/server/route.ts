import { sessionMiddleware } from '@/lib/session-middleware';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import {
  createDocumentSchema,
  createFolderSchema,
  editFolderSchema,
} from '../schema';
import { z } from 'zod';
import {
  DATABASE_ID,
  DOCUMENT_ID,
  IMAGES_BUCKET_ID,
  PROFILE_ID,
  VIEW_URL,
  WORKSPACE_DOCUMENT_FOLDER_ID,
  WORKSPACE_DOCUMENT_ID,
  WORKSPACE_ID,
} from '@/config';
import { ID, Query } from 'node-appwrite';
import {
  Profile,
  ProjectDocumentType,
  WorkspaceDocumentType,
  WorkspaceFolderType,
} from '@/types';
import { getMember } from '@/features/members/utils';

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
          }
        );

        return c.json({
          data: document,
        });
      } catch (error) {
        // console.log(error);
        return c.json(
          {
            error: 'Something went wrong, please try again',
          },
          500
        );
      }
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

      const documentsWithProfile = await Promise.all(
        documents.documents.map(async (document) => {
          const profile = await databases.getDocument<Profile>(
            DATABASE_ID,
            PROFILE_ID,
            document.uploadedBy
          );
          return {
            ...document,
            uploader: profile,
          };
        })
      );

      return c.json({
        data: {
          ...documents,
          documents: documentsWithProfile,
        },
      });
    }
  );

export default app;
