import { protect } from '@/features/auth/queries';
import { redirect } from 'next/navigation';
import { TaskIdClient } from './client';

const TaskIdPage = async () => {
  const user = await protect();

  if (!user) redirect('/signup');
  return <TaskIdClient />;
};

export default TaskIdPage;
