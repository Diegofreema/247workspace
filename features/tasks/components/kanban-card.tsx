import { TaskWithProjectAndAssignee } from '@/types';
import React from 'react';
import { TaskAction } from './tasks-actions';
import { MoreHorizontal } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { AvatarItem } from '@/components/navigation/workpsace-item';
import { TaskDueDate } from './task-due-date';
import { ProfileAvatar } from '@/components/ui/profile-avatar';

type Props = {
  task: TaskWithProjectAndAssignee;
};

export const KanbanCard = ({ task }: Props) => {
  return (
    <div className="bg-white p-2.5 mb-1.5 rounded shadow-sm space-y-3">
      <div className="flex items-start justify-between gap-x-2">
        <p className="text-sm line-clamp-2">{task.name}</p>
        <TaskAction projectId={task.projectId} taskId={task.$id}>
          <MoreHorizontal className="size-[18px] stroke-1 shrink-0 text-neutral-700 hover:opacity-75 transition" />
        </TaskAction>
      </div>
      <Separator />
      <div className="flex items-center gap-x-1.5">
        <ProfileAvatar name={task.assignee?.name!} />
        <div className="size-1 rounded-full bg-neutral-300" />

        <TaskDueDate value={task.dueDate} className="text-xs" />
      </div>
      <div className="flex items-center gap-x-1.5">
        <AvatarItem
          name={task?.project?.name!}
          image={task?.project?.imageUrl}
        />
      </div>
    </div>
  );
};
