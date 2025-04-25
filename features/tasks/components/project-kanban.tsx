import { MemberRole, StatusEnum, TaskWithProjectAndAssignee } from '@/types';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from '@hello-pangea/dnd';
import { useCallback, useEffect, useState } from 'react';

import { colors } from '@/constants';
import { Box } from '@chakra-ui/react';
import { KanbanColumnHeader } from './kaban-column-header';
import { KanbanCard } from './kanban-card';
import { toaster } from '@/components/ui/toaster';

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
  onChange: (
    tasks: { $id: string; status: StatusEnum; position: number }[]
  ) => void;
  memberRole: MemberRole;
};

export const ProjectKanban = ({ tasks: data, onChange, memberRole }: Props) => {
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

  useEffect(() => {
    const newTasks: TasksState = {
      [StatusEnum.BACKLOG]: [],
      [StatusEnum.TODO]: [],
      [StatusEnum.IN_PROGRESS]: [],
      [StatusEnum.IN_REVIEW]: [],
      [StatusEnum.DONE]: [],
    };
    data.forEach((task) => {
      newTasks[task.status].push(task);
    });
    Object.keys(newTasks).forEach((status) => {
      newTasks[status as StatusEnum].sort((a, b) => a.position - b.position);
    });
    setTasks(newTasks);
  }, [data]);

  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) return;
      const { source, destination } = result;

      if (
        memberRole !== MemberRole.CHIEF_ADMIN &&
        memberRole !== MemberRole.ADMIN &&
        destination.droppableId === StatusEnum.DONE
      ) {
        toaster.create({
          title: 'You are not authorized to move this task to done',
          type: 'info',
          duration: 5000,
        });
        return;
      }
      const sourceStatus = source.droppableId as StatusEnum;
      const destinationStatus = destination.droppableId as StatusEnum;
      let updatedPayload: {
        $id: string;
        status: StatusEnum;
        position: number;
      }[] = [];
      setTasks((prev) => {
        const newTasks = { ...prev };
        const sourceColumn = [...newTasks[sourceStatus]];
        const [movedTask] = sourceColumn.splice(source.index, 1);
        if (!movedTask) {
          console.log('No task found at the source index.');
          return prev;
        }
        const updatedTask =
          sourceStatus !== destinationStatus
            ? {
                ...movedTask,
                status: destinationStatus,
              }
            : movedTask;
        newTasks[sourceStatus] = sourceColumn;
        const destinationColumn = [...newTasks[destinationStatus]];
        destinationColumn.splice(destination.index, 0, updatedTask);
        newTasks[destinationStatus] = destinationColumn;

        updatedPayload = [];
        updatedPayload.push({
          $id: updatedTask.$id,
          status: destinationStatus,
          position: Math.min((destination.index + 1) * 1000, 1_000_000),
        });
        newTasks[destinationStatus].forEach((task, index) => {
          if (task && task.$id !== updatedTask.$id) {
            const newPosition = Math.min((index + 1) * 1000, 1_000_000);
            if (task.position !== newPosition) {
              updatedPayload.push({
                $id: task.$id,
                status: destinationStatus,
                position: newPosition,
              });
            }
          }
        });

        if (sourceStatus !== destinationStatus) {
          newTasks[sourceStatus].forEach((task, index) => {
            if (task) {
              const newPosition = Math.min((index + 1) * 1000, 1_000_000);
              if (task.position !== newPosition) {
                updatedPayload.push({
                  $id: task.$id,
                  status: sourceStatus,
                  position: newPosition,
                });
              }
            }
          });
        }

        return newTasks;
      });

      onChange(updatedPayload);
    },
    [onChange]
  );
  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
              <Droppable droppableId={board}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="min-h-[200px] py-1.5"
                  >
                    {tasks[board].map((task, index) => (
                      <Draggable
                        key={task.$id}
                        draggableId={task.$id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="text-black"
                          >
                            <KanbanCard task={task} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Box>
          );
        })}
      </div>
    </DragDropContext>
  );
};
