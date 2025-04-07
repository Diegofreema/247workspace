import { createAdminClient } from '@/lib/appwrite';
import { sessionMiddleware } from '@/lib/session-middleware';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { z } from 'zod';
import { getMember } from '../utils';
import { DATABASE_ID, MEMBERS_ID } from '@/config';
import { Query } from 'node-appwrite';
import { MemberRole } from '@/types';

const app = new Hono()
  .get(
    '/',
    sessionMiddleware,
    zValidator('query', z.object({ workspaceId: z.string() })),
    async (c) => {
      const { workspaceId } = c.req.query();
      const databases = c.get('databases');
      const user = c.get('user');
      const { users } = await createAdminClient();
      const member = getMember({ databases, userId: user.$id, workspaceId });

      if (!member) {
        return c.json(
          {
            error: 'Unauthorized',
          },
          401
        );
      }
      const members = await databases.listDocuments(DATABASE_ID, MEMBERS_ID, [
        Query.equal('workspaceId', workspaceId),
      ]);
      const membersWithUser = await Promise.all(
        members.documents.map(async (member) => {
          const user = await users.get(member.userId);
          return {
            ...member,
            name: user.name,
            email: user.email,
          };
        })
      );

      return c.json({
        ...members,
        documents: membersWithUser,
      });
    }
  )
  .delete('/:memberId', sessionMiddleware, async (c) => {
    const { memberId } = c.req.param();
    const databases = c.get('databases');
    const user = c.get('user');
    const memberToDelete = await databases.getDocument(
      DATABASE_ID,
      MEMBERS_ID,
      memberId
    );
    if (!memberToDelete) {
      return c.json(
        {
          error: 'Member not found',
        },
        404
      );
    }
    const allMembers = await databases.listDocuments(DATABASE_ID, MEMBERS_ID, [
      Query.equal('workspaceId', memberToDelete.workspaceId),
    ]);

    const member = await getMember({
      databases,
      userId: user.$id,
      workspaceId: memberToDelete.workspaceId,
    });
    if (!member) {
      return c.json(
        {
          error: 'Unauthorized',
        },
        401
      );
    }

    if (member.$id === memberToDelete.$id || member.role !== MemberRole.ADMIN) {
      return c.json(
        {
          error: 'Unauthorized',
        },
        401
      );
    }
    if (allMembers.documents.length === 1) {
      return c.json(
        {
          error: 'Cannot delete the last member',
        },
        400
      );
    }

    await databases.deleteDocument(DATABASE_ID, MEMBERS_ID, memberToDelete.$id);

    return c.json({
      data: { $id: memberToDelete.$id },
    });
  })
  .patch(
    '/:memberId',
    sessionMiddleware,
    zValidator('json', z.object({ role: z.nativeEnum(MemberRole) })),
    async (c) => {
      const { memberId } = c.req.param();
      const databases = c.get('databases');
      const user = c.get('user');
      const { role } = c.req.valid('json');
      const memberToUpdate = await databases.getDocument(
        DATABASE_ID,
        MEMBERS_ID,
        memberId
      );
      if (!memberToUpdate) {
        return c.json(
          {
            error: 'Member not found',
          },
          404
        );
      }
      const allMembers = await databases.listDocuments(
        DATABASE_ID,
        MEMBERS_ID,
        [Query.equal('workspaceId', memberToUpdate.workspaceId)]
      );

      const member = await getMember({
        databases,
        userId: user.$id,
        workspaceId: memberToUpdate.workspaceId,
      });
      if (!member) {
        return c.json(
          {
            error: 'Unauthorized',
          },
          401
        );
      }

      if (member.role !== MemberRole.ADMIN) {
        return c.json(
          {
            error: 'Unauthorized',
          },
          401
        );
      }
      if (allMembers.documents.length === 1) {
        return c.json(
          {
            error: 'Cannot delete the last member',
          },
          400
        );
      }

      await databases.updateDocument(
        DATABASE_ID,
        MEMBERS_ID,
        memberToUpdate.$id,
        {
          role,
        }
      );

      return c.json({
        data: { $id: memberToUpdate.$id },
      });
    }
  );

export default app;
