import { CreateTaskForm } from '@/components/form/create-task-form';
import { ReusableSkeleton } from '@/components/skeletons/link-skeleton';
import { useGetMembers } from '@/features/members/api/use-get-members';
import { useGetProjects } from '@/features/projects/api/use-get-projects';
import { useWorkspaceId } from '@/hooks/useWorkspaceId';
import { Stack } from '@chakra-ui/react';
import React from 'react';
import { useGetTask } from '../api/use-get-task';
import { EditTaskForm } from '@/components/form/edit-task-form';

type Props = {
  taskId: string;
};

const array = Array(7).fill(0);
export const EditTaskWrapper = ({ taskId }: Props) => {
  const workspaceId = useWorkspaceId();
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

  const isLoading = isPendingProjects || isPendingMembers || isPendingTask;
  const isError = isErrorProjects || isErrorMembers || isErrorTask;

  if (isError) {
    throw new Error('Error getting projects and members');
  }
  if (isLoading) {
    return (
      <Stack gap={7}>
        {array.map((_, i) => (
          <ReusableSkeleton
            key={i}
            height={i === array.at(-1) ? '30px' : '10px'}
          />
        ))}
      </Stack>
    );
  }

  const projectOptions = projects?.data.documents.map((project) => ({
    name: project.name,
    id: project.$id,
    imageUrl: project?.imageUrl,
  }));

  const memberOptions = members?.documents.map((member) => ({
    name: member.name,
    id: member.$id,
    imageUrl: member?.avatarUrl,
  }));

  return (
    <EditTaskForm
      projectOptions={projectOptions}
      memberOptions={memberOptions}
      initialValues={initialValue.data}
    />
  );
};
