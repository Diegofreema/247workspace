import { getLoggedInUser } from '@/features/auth/queries';
import { redirect } from 'next/navigation';
import React from 'react';
import { TaskIdClient } from './client';

const TaskIdPage = async () => {
  const user = await getLoggedInUser();

  if (!user) redirect('/signup');
  return <TaskIdClient />;
};

export default TaskIdPage;
