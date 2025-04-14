import { StatusEnum, TaskWithProjectAndAssignee } from '@/types';
import { SimpleGrid } from '@chakra-ui/react';
import { TaskInfoCard } from './task-info-card';

type Props = {
  tasks: TaskWithProjectAndAssignee[];
  userId: string;
};
export const TasksInfo = ({ tasks, userId }: Props) => {
  const underReviewLength =
    tasks.filter(
      (t) => t.assigneeId === userId && t.status === StatusEnum.IN_REVIEW
    ).length ?? 0;
  const assignedToLength =
    tasks.filter((t) => t.assigneeId === userId).length ?? 0;
  const completedTaskLength =
    tasks.filter(
      (t) => (t.assigneeId === userId && t.status) === StatusEnum.DONE
    ).length ?? 0;
  const todoTasksLength =
    tasks.filter((t) => t.assigneeId === userId && t.status === StatusEnum.TODO)
      .length ?? 0;
  const data = [
    {
      label: 'Total tasks',
      value: tasks?.length,
    },
    {
      label: 'Under review',
      value: underReviewLength,
    },
    {
      label: 'Assigned Task',
      value: assignedToLength,
    },
    {
      label: 'Completed Task',
      value: completedTaskLength,
    },
    {
      label: 'Todo Task',
      value: todoTasksLength,
    },
  ];
  return (
    <SimpleGrid
      gap={{ base: 4, md: 8 }}
      columns={{ base: 1, md: 2, lg: 5 }}
      mt={4}
    >
      {data.map((item) => (
        <TaskInfoCard key={item.label} label={item.label} value={item.value} />
      ))}
    </SimpleGrid>
  );
};
