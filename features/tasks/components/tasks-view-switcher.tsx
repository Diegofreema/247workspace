'use client';

import { SmallerLoader } from '@/components/ui/small-loader';
import { useGetTasks } from '@/features/tasks/api/use-get-task';
import { TaskTabs } from '@/features/tasks/components/task-tabs';
import { TasksInfo } from '@/features/tasks/components/tasks-info';
import { useWorkspaceId } from '@/hooks/useWorkspaceId';
import { useDataFilters } from '@/lib/nuqs/use-data-filter';
import { Stack } from '@chakra-ui/react';

export const TaskViewSwitcher = () => {
  const workspaceId = useWorkspaceId();

  const [{ assigneeId, dueDate, projectId, status, search }] = useDataFilters();
  const { data, isPending, isError } = useGetTasks({
    workspaceId,
    assigneeId,
    dueDate,
    projectId,
    status,
    search,
  });
  if (isError) {
    throw new Error('Failed to get tasks');
  }

  if (isPending) {
    return <SmallerLoader />;
  }

  const { documents } = data.data;

  return (
    <Stack gap={2}>
      <TaskTabs tasks={documents} />
    </Stack>
  );
};
