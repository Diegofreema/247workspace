'use client';

import { useGetTasks } from '@/features/tasks/api/use-get-tasks';
import { TaskTabs } from '@/features/tasks/components/task-tabs';
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

  return (
    <Stack gap={2}>
      {/* @ts-ignore */}
      <TaskTabs tasks={data?.data?.documents ?? []} isPending={isPending} />
    </Stack>
  );
};
