import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ExternalLinkIcon, Pencil, Trash } from 'lucide-react';

type Props = {
  projectId: string;
  taskId: string;
  children: React.ReactNode;
};

export const TaskAction = ({ children, projectId, taskId }: Props) => {
  return (
    <div className="flex justify-end">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 text-black bg-white">
          <DropdownMenuItem
            onClick={() => {}}
            disabled={false}
            className="font-medium p-[10px]"
          >
            <ExternalLinkIcon className="size-4 mr-2 stroke-2" />
            Task Details
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {}}
            disabled={false}
            className="font-medium p-[10px]"
          >
            <ExternalLinkIcon className="size-4 mr-2 stroke-2" />
            Open Project
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {}}
            disabled={false}
            className="font-medium p-[10px]"
          >
            <Pencil className="size-4 mr-2 stroke-2" />
            Edit task
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => {}}
            disabled={false}
            className="text-amber-700 focus:text-amber-700 font-medium p-[10px]"
          >
            <Trash className="size-4 mr-2 stroke-2" />
            Delete task
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
