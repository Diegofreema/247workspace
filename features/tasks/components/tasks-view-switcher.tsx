'use client';

import { useGetMembers } from '@/features/members/api/use-get-members';
import { useGetTasks } from '@/features/tasks/api/use-get-tasks';
import { TaskTabs } from '@/features/tasks/components/task-tabs';
import { useProjectId } from '@/hooks/useProjectId';
import { useWorkspaceId } from '@/hooks/useWorkspaceId';
import { useDataFilters } from '@/lib/nuqs/use-data-filter';
import { MemberRole } from '@/types';
import { Stack } from '@chakra-ui/react';

type Props = {
  hideProjectFilter?: boolean;
  memberId: string;
};
export const TaskViewSwitcher = ({ hideProjectFilter, memberId }: Props) => {
  const workspaceId = useWorkspaceId();
  const defaultProjectId = useProjectId();
  const {
    data: members,
    isPending: isPendingMembers,
    isError: isErrorMembers,
  } = useGetMembers({ workspaceId });

  const [{ assigneeId, dueDate, projectId, status, search }] = useDataFilters();
  const { data, isPending, isError } = useGetTasks({
    workspaceId,
    assigneeId,
    dueDate,
    projectId: projectId || defaultProjectId,
    status,
    search,
  });
  if (isError || isErrorMembers) {
    throw new Error('Failed to get tasks');
  }

  const memberRole = members?.documents.find(
    (member) => member.$id === memberId
  )?.memberRole;

  return (
    <Stack gap={2}>
      {/* @ts-ignore */}
      <TaskTabs
        tasks={data?.documents ?? []}
        isPending={isPending || isPendingMembers}
        hideProjectFilter={hideProjectFilter}
        memberRole={memberRole as MemberRole}
      />
    </Stack>
  );
};
