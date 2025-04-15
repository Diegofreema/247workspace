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
    <CircleIcon className="size-[18px] text-yellow-400" />
  ),
  [StatusEnum.IN_REVIEW]: <CircleIcon className="size-[18px] text-blue-400" />,
  [StatusEnum.DONE]: <CircleIcon className="size-[18px] text-emerald-400" />,
};
export const KanbanColumnHeader = ({ board, taskCount }: Props) => {
  const icon = statusIconMap[board];
  return (
    <div className="px-2 py-1.5 flex items-center justify-between ">
      <div className="flex items-center gap-x-2 text-black ">
        {icon}
        <h2>{snakeCaseToTitleCase(board)}</h2>
        {taskCount}
      </div>
    </div>
  );
};
