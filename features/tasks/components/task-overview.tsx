import { TaskWithProjectAndAssignee } from '@/types';
import React from 'react';

type Props = {
  task: TaskWithProjectAndAssignee;
};

export const TaskOverview = ({ task }: Props) => {
  return <div>TaskOverview</div>;
};
