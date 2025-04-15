import { snakeCaseToTitleCase } from '@/utils/helper';
import React from 'react';
import {
  CircleCheckIcon,
  CircleDashedIcon,
  CircleDotDashedIcon,
  CircleDotIcon,
  CircleIcon,
  PlusIcon,
} from 'lucide-react';
import { StatusEnum } from '@/types';
import { Button } from '@/components/ui/button';
import {
  useCreateTaskModalController,
  useSetTask,
} from '@/lib/nuqs/use-create-task';
type Props = {
  board: StatusEnum;
  taskCount: number;
};
const statusIconMap: Record<StatusEnum, React.ReactNode> = {
  [StatusEnum.BACKLOG]: (
    <CircleDotDashedIcon className="size-[18px] text-pink-400" />
  ),
  [StatusEnum.TODO]: <CircleIcon className="size-[18px] text-red-400" />,
  [StatusEnum.IN_PROGRESS]: (
    <CircleDashedIcon className="size-[18px] text-yellow-400" />
  ),
  [StatusEnum.IN_REVIEW]: (
    <CircleDotIcon className="size-[18px] text-blue-400" />
  ),
  [StatusEnum.DONE]: (
    <CircleCheckIcon className="size-[18px] text-emerald-400" />
  ),
};
export const KanbanColumnHeader = ({ board, taskCount }: Props) => {
  const icon = statusIconMap[board];
  const { open } = useCreateTaskModalController();
  const { onSetStatus } = useSetTask();
  const onClick = () => {
    onSetStatus(board);
    open();
  };
  return (
    <div className="px-2 py-1.5 flex items-center justify-between ">
      <div className="flex items-center gap-x-2 text-black ">
        {icon}
        <h2 className="text-sm font-medium">{snakeCaseToTitleCase(board)}</h2>
        <div className="size-5 flex items-center justify-center rounded-md bg-neutral-200 text-sm text-neutral-700 font-medium">
          {taskCount}
        </div>
      </div>
      <Button
        variant={'ghost'}
        onClick={onClick}
        size={'icon'}
        className="size-5"
      >
        <PlusIcon className="size-5 text-neutral-500" />
      </Button>
    </div>
  );
};
