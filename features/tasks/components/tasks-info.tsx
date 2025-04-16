'use client';

import { StatusEnum } from '@/types';
import { SimpleGrid } from '@chakra-ui/react';

import { useWorkspaceId } from '@/hooks/useWorkspaceId';
import { useGetTasks } from '../api/use-get-tasks';
import { TaskInfoCard } from './task-info-card';
import { CardSkeleton } from '@/components/skeletons/card-skeleton';

type Props = {
  userId: string;
};
export const TasksInfo = ({ userId }: Props) => {
  const workspaceId = useWorkspaceId();

  const { data: dataTasks, isPending, isError } = useGetTasks({ workspaceId });

  if (isError) {
    throw new Error('Error fetching tasks');
  }

  if (isPending) {
    return (
      <SimpleGrid
        gap={{ base: 4, md: 8 }}
        columns={{ base: 1, md: 2, lg: 5 }}
        mt={4}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </SimpleGrid>
    );
  }

  const {
    data: { documents: tasks },
  } = dataTasks;
  const underReviewLength =
    tasks.filter(
      (t) => t.assignee?.userId === userId && t.status === StatusEnum.IN_REVIEW
    ).length ?? 0;
  const assignedToLength =
    tasks.filter((t) => t.assignee?.userId === userId).length ?? 0;
  const completedTaskLength =
    tasks.filter(
      (t) => (t.assignee?.userId === userId && t.status) === StatusEnum.DONE
    ).length ?? 0;
  const todoTasksLength =
    tasks.filter(
      (t) => t.assignee?.userId === userId && t.status === StatusEnum.TODO
    ).length ?? 0;
  const data = [
    {
      label: 'Total tasks',
      value: tasks?.length,
    },
    {
      label: 'Under review',
      value: underReviewLength,
    },
    {
      label: 'Assigned Task',
      value: assignedToLength,
    },
    {
      label: 'Completed Task',
      value: completedTaskLength,
    },
    {
      label: 'Todo Task',
      value: todoTasksLength,
    },
  ];
  return (
    <SimpleGrid
      gap={{ base: 4, md: 8 }}
      columns={{ base: 1, md: 2, lg: 5 }}
      mt={4}
    >
      {data.map((item) => (
        <TaskInfoCard key={item.label} label={item.label} value={item.value} />
      ))}
    </SimpleGrid>
  );
};
