'use client';

import { FlexBox } from '@/components/custom/flex-box';
import { Button } from '@/components/ui/button';
import { ProfileAvatar } from '@/components/ui/profile-avatar';
import { TaskWithProjectAndAssignee } from '@/types';
import { snakeCaseToTitleCase } from '@/utils/helper';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreVertical } from 'lucide-react';
import { TaskDueDate } from './task-due-date';
import { Badge } from '@/components/ui/badge';
import { TaskAction } from './tasks-actions';
export const columns: ColumnDef<TaskWithProjectAndAssignee>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="hover:bg-purple"
        >
          Task name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const name = row.original.name;
      return <p className="line-clamp-1">{name}</p>;
    },
  },
  {
    accessorKey: 'project',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="hover:bg-purple"
        >
          Project
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const project = row.original.project;
      return (
        <FlexBox
          gap={2}
          className="flex items-center gap-x-4 text-sm font-medium "
        >
          <ProfileAvatar name={project?.name!} imageUrl={project?.imageUrl} />
          <p className="line-clamp-1">{project?.name}</p>
        </FlexBox>
      );
    },
  },
  {
    accessorKey: 'assignee',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="hover:bg-purple"
        >
          Assignee
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const assignee = row.original.assignee;
      return (
        <FlexBox
          gap={2}
          className="flex items-center gap-x-4 text-sm font-medium "
        >
          <ProfileAvatar
            name={assignee?.name!}
            imageUrl={assignee?.avatarUrl}
          />
          <p className="line-clamp-1">{assignee?.name}</p>
        </FlexBox>
      );
    },
  },
  {
    accessorKey: 'dueDate',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="hover:bg-purple"
        >
          Due date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const dueDate = row.original.dueDate;
      return <TaskDueDate value={dueDate} />;
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="hover:bg-purple"
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge variant={status} className="text-white">
          {snakeCaseToTitleCase(status)}
        </Badge>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const taskId = row.original.$id;
      const projectId = row.original.projectId;
      return (
        <TaskAction taskId={taskId} projectId={projectId}>
          <Button variant="ghost" className="size-8 p-0">
            <MoreVertical className="size-4" />
          </Button>
        </TaskAction>
      );
    },
  },
];
