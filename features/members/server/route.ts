import { DATABASE_ID, MEMBERS_ID } from '@/config';
import { getProfile } from '@/features/workspaces/queries';
import { sessionMiddleware } from '@/lib/session-middleware';
import { Member, MemberRole, Profile } from '@/types';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { Query } from 'node-appwrite';
import { z } from 'zod';
import { getMember } from '../utils';

const app = new Hono()
  .get(
    '/member',
    sessionMiddleware,
    zValidator('query', z.object({ memberId: z.string() })),
    async (c) => {
      const { memberId } = c.req.query();
      const databases = c.get('databases');
      const member = await databases.getDocument(
        DATABASE_ID,
        MEMBERS_ID,
        memberId
      );
      if (!member) {
        return c.json(
          {
            error: 'Member not found',
          },
          404
        );
      }
      return c.json({
        data: member,
      });
    }
  )
  .get(
    '/',
    sessionMiddleware,
    zValidator('query', z.object({ workspaceId: z.string() })),
    async (c) => {
      const { workspaceId } = c.req.query();
      const databases = c.get('databases');
      const user = c.get('user');

      try {
        const member = getMember({ databases, userId: user.$id, workspaceId });

        if (!member) {
          return c.json(
            {
              error: 'Unauthorized',
            },
            401
          );
        }
        const members = await databases.listDocuments<Member>(
          DATABASE_ID,
          MEMBERS_ID,
          [Query.equal('workspaceId', workspaceId)]
        );
        const membersWithUser = await Promise.all(
          members.documents.map(async (member) => {
            const user = (await getProfile(member.userId)) as Profile;
            return {
              ...member,
              name: user?.name,
              email: user?.email,
              role: user?.role,
              avatarUrl: user?.avatarUrl,
              boi: user?.bio,
            };
          })
        );

        return c.json({
          ...members,
          documents: membersWithUser,
        });
      } catch (error) {
        console.log(error);

        return c.json({ error: 'Failed to get members' }, 401);
      }
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
      try {
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

        if (
          member.role !== MemberRole.ADMIN &&
          role !== MemberRole.CHIEF_ADMIN
        ) {
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
            memberRole: role,
          }
        );

        return c.json({
          data: { $id: memberToUpdate.workspaceId },
        });
      } catch (error) {
        console.log(error);

        return c.json(
          {
            error: 'Internal Server Error',
          },
          500
        );
      }
    }
  );

export default app;
