'use client';

import { Stack } from '@chakra-ui/react';
import { TaskTabs } from '@/features/tasks/components/task-tabs';
import { TasksInfo } from '@/features/tasks/components/tasks-info';
import { useWorkspaceId } from '@/hooks/useWorkspaceId';
import { useProjectId } from '@/hooks/useProjectId';
import { useGetTasks } from '@/features/tasks/api/use-get-task';
import { Loading } from '@/components/ui/loading';

type Props = {};

export const TaskViewSwitcher = ({}: Props) => {
  const workspaceId = useWorkspaceId();
  const projectId = useProjectId();
  const { data, isPending, isError } = useGetTasks({ workspaceId, projectId });
  if (isError) {
    throw new Error('Failed to get tasks');
  }

  if (isPending) {
    return <Loading />;
  }
  console.log(data);

  const { documents } = data.data;

  return (
    <Stack gap={4}>
      <TasksInfo tasks={documents} />
      <TaskTabs />
    </Stack>
  );
};
