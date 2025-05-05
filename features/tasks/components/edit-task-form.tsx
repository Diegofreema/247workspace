import { CreateTaskForm } from '@/components/form/create-task-form';
import { ReusableSkeleton } from '@/components/skeletons/link-skeleton';
import { useGetMembers } from '@/features/members/api/use-get-members';
import { useGetProjects } from '@/features/projects/api/use-get-projects';
import { useWorkspaceId } from '@/hooks/useWorkspaceId';
import { Stack } from '@chakra-ui/react';
import React from 'react';
import { useGetTask } from '../api/use-get-task';
import { EditTaskForm } from '@/components/form/edit-task-form';
import { useCurrentUser } from '@/features/auth/api/use-current-user';
import { MemberRole } from '@/types';

type Props = {
  taskId: string;
};

const array = Array(7).fill(0);
export const EditTaskWrapper = ({ taskId }: Props) => {
  const workspaceId = useWorkspaceId();
  const {
    data,
    isPending: isPendingUser,
    isError: isErrorUser,
  } = useCurrentUser();
  const {
    data: initialValue,
    isPending: isPendingTask,
    isError: isErrorTask,
  } = useGetTask({ taskId });
  const {
    data: projects,
    isPending: isPendingProjects,
    isError: isErrorProjects,
  } = useGetProjects({
    workspaceId,
  });
  const {
    data: members,
    isPending: isPendingMembers,
    isError: isErrorMembers,
  } = useGetMembers({
    workspaceId,
  });

  const isLoading =
    isPendingProjects || isPendingMembers || isPendingTask || isPendingUser;
  const isError =
    isErrorProjects || isErrorMembers || isErrorTask || isErrorUser;

  if (isError) {
    throw new Error('Error getting projects and members');
  }
  if (isLoading) {
    return (
      <Stack gap={7}>
        {array.map((_, i) => {
          const isLast = i === array.length - 1;
          return <ReusableSkeleton key={i} height={isLast ? '30px' : '80px'} />;
        })}
      </Stack>
    );
  }

  const projectOptions = projects?.documents.map((project) => ({
    name: project.name,
    id: project.$id,
    imageUrl: project?.imageUrl,
  }));

  const memberOptions = members?.documents.map((member) => ({
    name: member.name,
    id: member.$id,
    imageUrl: member?.avatarUrl,
  }));
  const memberRole = members?.documents.find(
    (member) => member.userId === data.user?.$id
  )?.memberRole as MemberRole;
  console.log(memberRole);

  return (
    <EditTaskForm
      projectOptions={projectOptions}
      memberOptions={memberOptions}
      initialValues={initialValue.data}
      memberRole={memberRole}
    />
  );
};
