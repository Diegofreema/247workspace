'use client';

import { ErrorComponent } from '@/components/ui/error-component';
import { SmallerLoader } from '@/components/ui/small-loader';
import { WrapperWithPadding } from '@/components/ui/wrapper-padding';
import { useGetTask } from '@/features/tasks/api/use-get-task';
import { TaskBreadcrumb } from '@/features/tasks/components/task-breadcrumb';
import { useTaskId } from '@/hooks/use-task-id';
import React from 'react';

export const TaskIdClient = () => {
  const taskId = useTaskId();
  const { data, isPending, isError, refetch } = useGetTask({ taskId });

  if (isError) {
    return <ErrorComponent message="Failed to get task" reset={refetch} />;
  }

  if (isPending) {
    return <SmallerLoader />;
  }

  const {
    data: { project, name, $id },
  } = data;
  return (
    <WrapperWithPadding className="bg-lightGrey">
      <TaskBreadcrumb project={project} taskName={name} taskId={$id} />
    </WrapperWithPadding>
  );
};
