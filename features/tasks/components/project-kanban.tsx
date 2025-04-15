import { TaskWithProjectAndAssignee, StatusEnum } from '@/types';
import React, { useCallback, useEffect, useState } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd';

import { KanbanColumnHeader } from './kaban-column-header';
import { Box } from '@chakra-ui/react';
import { colors } from '@/constants';

const boards: StatusEnum[] = [
  StatusEnum.BACKLOG,
  StatusEnum.TODO,
  StatusEnum.IN_PROGRESS,
  StatusEnum.IN_REVIEW,
  StatusEnum.DONE,
];

type TasksState = {
  [key in StatusEnum]: TaskWithProjectAndAssignee[];
};

type Props = {
  tasks: TaskWithProjectAndAssignee[];
};

export const ProjectKanban = ({ tasks: data }: Props) => {
  const [tasks, setTasks] = useState<TasksState>(() => {
    const initialTasks: TasksState = {
      [StatusEnum.BACKLOG]: [],
      [StatusEnum.TODO]: [],
      [StatusEnum.IN_PROGRESS]: [],
      [StatusEnum.IN_REVIEW]: [],
      [StatusEnum.DONE]: [],
    };
    data.forEach((task) => {
      initialTasks[task.status].push(task);
    });

    Object.keys(initialTasks).forEach((status) => {
      initialTasks[status as StatusEnum].sort(
        (a, b) => a.position - b.position
      );
    });
    return initialTasks;
  });
  return (
    <DragDropContext onDragEnd={() => {}}>
      <div className="flex overflow-x-auto">
        {boards.map((board) => {
          return (
            <Box
              key={board}
              bg={colors.lightGrey}
              className="flex-1 mx-2 bg-muted p-1.5 bg-lightGrey rounded-md min-w-[200px]"
            >
              <KanbanColumnHeader
                board={board}
                taskCount={tasks[board].length}
              />
            </Box>
          );
        })}
      </div>
    </DragDropContext>
  );
};
