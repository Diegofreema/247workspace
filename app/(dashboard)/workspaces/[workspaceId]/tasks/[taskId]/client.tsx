'use client';

import { ErrorComponent } from '@/components/ui/error-component';
import { Separator } from '@/components/ui/separator';
import { SmallerLoader } from '@/components/ui/small-loader';
import { WrapperWithPadding } from '@/components/ui/wrapper-padding';
import { useGetFeedbacks } from '@/features/feedbacks/api/use-get-feedbacks';
import { useGetTask } from '@/features/tasks/api/use-get-task';
import { Feedbacks } from '@/features/tasks/components/feedback';
import { TaskBreadcrumb } from '@/features/tasks/components/task-breadcrumb';
import { TaskDescription } from '@/features/tasks/components/task-description';
import { TaskOverview } from '@/features/tasks/components/task-overview';
import { useTaskId } from '@/hooks/use-task-id';
import { SimpleGrid, Stack } from '@chakra-ui/react';
import React from 'react';

export const TaskIdClient = () => {
  const taskId = useTaskId();
  const {
    data: taskData,
    isPending,
    isError,
    refetch,
  } = useGetTask({ taskId });
  const {
    data: feedbacks,
    isPending: isPendingFeedbacks,
    isError: isErrorFeedback,
    refetch: refetchFeedback,
  } = useGetFeedbacks({ taskId });
  if (isError || isErrorFeedback) {
    return (
      <Stack mt={50}>
        <ErrorComponent
          message="Failed to get task"
          reset={() => {
            refetch();
            refetchFeedback();
          }}
        />
      </Stack>
    );
  }

  if (isPending || isPendingFeedbacks) {
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
        <TaskDescription task={data} />
      </SimpleGrid>
      <Feedbacks feedbacks={feedbacks} />
    </WrapperWithPadding>
  );
};
