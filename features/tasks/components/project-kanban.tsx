import { TaskWithProjectAndAssignee } from '@/types';
import React from 'react';

type Props = {
  tasks: TaskWithProjectAndAssignee[];
};

export const ProjectKanban = ({ tasks }: Props) => {
  return <div className="text-black">ProjectKanban</div>;
};
