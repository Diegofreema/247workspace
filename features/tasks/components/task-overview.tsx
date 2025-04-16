'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ProfileAvatar } from '@/components/ui/profile-avatar';
import { Separator } from '@/components/ui/separator';
import { useEditTaskModalController } from '@/lib/nuqs/use-editi-task-modal-contoller';
import { TaskWithProjectAndAssignee } from '@/types';
import { snakeCaseToTitleCase } from '@/utils/helper';
import { Pencil } from 'lucide-react';
import { OverviewProperty } from './overview-property';
import { TaskDueDate } from './task-due-date';

type Props = {
  task: TaskWithProjectAndAssignee;
};

export const TaskOverview = ({ task }: Props) => {
  const { open } = useEditTaskModalController();
  return (
    <div className="flex flex-col gap-y-4 col-span-1 bg-white">
      <div className="bg-white shadow-sm rounded-lg p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold text-black">Overview</p>
          <Button
            onClick={() => open(task.$id)}
            size={'sm'}
            variant={'secondary'}
            className="bg-purple"
          >
            <Pencil className="size-4 mr-2" />
            Edit
          </Button>
        </div>
        <Separator className="my-4" />
        <div className="flex flex-col gap-4">
          <OverviewProperty label="Assignee">
            <ProfileAvatar
              name={task.assignee?.name!}
              imageUrl={task.assignee?.avatarUrl}
            />
            <p className="text-sm font-medium text-black">
              {task.assignee?.name}
            </p>
          </OverviewProperty>
          <OverviewProperty label="Due Date">
            <TaskDueDate value={task.dueDate} className="text-sm font-medium" />
          </OverviewProperty>
          <OverviewProperty label="Status">
            <Badge variant={task.status}>
              {snakeCaseToTitleCase(task.status)}
            </Badge>
          </OverviewProperty>
        </div>
      </div>
    </div>
  );
};
