import { ConfirmDialog } from '@/components/modals/confirm-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { colors } from '@/constants';
import { useWorkspaceId } from '@/hooks/useWorkspaceId';
import { ExternalLinkIcon, Pencil, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDeleteTask } from '../api/use-delete-task';
import { useEditTaskModalController } from '@/lib/nuqs/use-editi-task-modal-contoller';

type Props = {
  projectId: string;
  taskId: string;
  children: React.ReactNode;
};

export const TaskAction = ({ children, projectId, taskId }: Props) => {
  const { mutateAsync, isPending } = useDeleteTask();
  const { open } = useEditTaskModalController();
  const [isOpen, setOpen] = useState(false);
  const workspaceId = useWorkspaceId();
  const router = useRouter();
  const isLoading = isPending;
  const onDelete = async () => {
    await mutateAsync(
      { param: { taskId } },
      {
        onSuccess: () => {
          setOpen(false);
        },
      }
    );
  };

  const onOpenTask = () => {
    router.push(`/workspaces/${workspaceId}/tasks/${taskId}`);
  };

  const onOpenProject = () => {
    router.push(`/workspaces/${workspaceId}/projects/${projectId}`);
  };
  return (
    <>
      <ConfirmDialog
        isOpen={isOpen}
        setIsOpen={setOpen}
        onCancel={() => setOpen(false)}
        isSubmitting={isPending}
        title="Delete task"
        subtitle="Are you sure you want to delete this task?, this action is irreversible."
        confirmButtonText="Delete"
        onConfirm={onDelete}
        btnColor={colors.red}
      />
      <div className="flex justify-end">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 text-black bg-white">
            <DropdownMenuItem
              onClick={onOpenTask}
              disabled={isLoading}
              className="font-medium p-[10px]"
            >
              <ExternalLinkIcon className="size-4 mr-2 stroke-2" />
              Task Details
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={onOpenProject}
              disabled={isLoading}
              className="font-medium p-[10px]"
            >
              <ExternalLinkIcon className="size-4 mr-2 stroke-2" />
              Open Project
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => open(taskId)}
              disabled={isLoading}
              className="font-medium p-[10px]"
            >
              <Pencil className="size-4 mr-2 stroke-2" />
              Edit task
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => setOpen(true)}
              disabled={isLoading}
              className="text-amber-700 focus:text-amber-700 font-medium p-[10px]"
            >
              <Trash className="size-4 mr-2 stroke-2" />
              Delete task
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};
