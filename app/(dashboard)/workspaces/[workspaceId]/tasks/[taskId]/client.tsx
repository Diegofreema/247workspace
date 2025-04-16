'use client';

import { ErrorComponent } from '@/components/ui/error-component';
import { Separator } from '@/components/ui/separator';
import { SmallerLoader } from '@/components/ui/small-loader';
import { WrapperWithPadding } from '@/components/ui/wrapper-padding';
import { useGetTask } from '@/features/tasks/api/use-get-task';
import { TaskBreadcrumb } from '@/features/tasks/components/task-breadcrumb';
import { TaskOverview } from '@/features/tasks/components/task-overview';
import { useTaskId } from '@/hooks/use-task-id';
import { SimpleGrid } from '@chakra-ui/react';
import React from 'react';

export const TaskIdClient = () => {
  const taskId = useTaskId();
  const {
    data: taskData,
    isPending,
    isError,
    refetch,
  } = useGetTask({ taskId });

  if (isError) {
    return <ErrorComponent message="Failed to get task" reset={refetch} />;
  }

  if (isPending) {
    return <SmallerLoader />;
  }

  const { data } = taskData;
  return (
    <WrapperWithPadding className="bg-lightGrey">
      <TaskBreadcrumb
        project={data?.project}
        taskName={data?.name}
        taskId={data?.$id}
      />
      <Separator className="my-6" />
      <SimpleGrid columns={{ base: 1, lg: 2 }} gap={4}>
        <TaskOverview task={data} />
      </SimpleGrid>
    </WrapperWithPadding>
  );
};
