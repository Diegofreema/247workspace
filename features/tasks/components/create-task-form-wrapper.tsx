import { CreateTaskForm } from '@/components/form/create-task-form';
import { ReusableSkeleton } from '@/components/skeletons/link-skeleton';
import { useGetMembers } from '@/features/members/api/use-get-members';
import { useGetProjects } from '@/features/projects/api/use-get-projects';
import { useWorkspaceId } from '@/hooks/useWorkspaceId';
import { Stack } from '@chakra-ui/react';
import React from 'react';

type Props = {};

export const CreateTaskFormWrapper = ({}: Props) => {
  const workspaceId = useWorkspaceId();
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

  const isLoading = isPendingProjects || isPendingMembers;
  const isError = isErrorProjects || isErrorMembers;

  if (isError) {
    throw new Error('Error getting projects and members');
  }
  if (isLoading) {
    return (
      <Stack gap={4}>
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <ReusableSkeleton key={i} />
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
  }));
  return (
    <CreateTaskForm
      projectOptions={projectOptions}
      memberOptions={memberOptions}
    />
  );
};
