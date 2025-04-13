import { TaskWithProjectAndAssignee } from '@/types';

type Props = {
  tasks: TaskWithProjectAndAssignee[];
};
export const TasksInfo = ({ tasks }: Props) => {
  console.log(tasks);
  return <div>TasksInfo</div>;
};
