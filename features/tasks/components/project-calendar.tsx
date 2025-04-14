import { TaskWithProjectAndAssignee } from '@/types';
import React from 'react';

type Props = {
  tasks: TaskWithProjectAndAssignee[];
};

export const ProjectCalendar = ({}: Props) => {
  return <div className="text-black">ProjectCalendar</div>;
};
