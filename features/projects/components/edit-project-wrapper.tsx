import React from 'react';
import { EditProjectCard } from './edit-project-card';
import { useEditProjectModalController } from '@/lib/nuqs/use-edit-project-modal';
import { useGetProject } from '../api/use-get-project';
import { ReusableSkeleton } from '@/components/skeletons/link-skeleton';
import { Stack } from '@chakra-ui/react';

export const EditProjectWrapper = () => {
  const { projectId } = useEditProjectModalController();
  const { data, isPending, isError } = useGetProject({ projectId: projectId! });
  if (isError) {
    return (
      <Stack>
        <p className="text-center ">Something went wrong</p>
        <p className="text-center ">Please try again later</p>
      </Stack>
    );
  }
  if (isPending) {
    return (
      <Stack gap={4}>
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <ReusableSkeleton key={i} />
          ))}
      </Stack>
    );
  }
  return <EditProjectCard initialValue={data} />;
};
