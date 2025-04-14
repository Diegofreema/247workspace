import { TaskWithProjectAndAssignee } from '@/types';
import React from 'react';

type Props = {
  tasks: TaskWithProjectAndAssignee[];
};

export const ProjectTable = ({ tasks }: Props) => {
  return <div className="text-black">{JSON.stringify(tasks)}</div>;
};
