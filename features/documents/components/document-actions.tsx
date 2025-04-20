import { ConfirmDialog } from '@/components/modals/confirm-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { colors } from '@/constants';
import { ExternalLink, File, Pencil, Plus, Trash } from 'lucide-react';
import { useState } from 'react';

import { useEditProjectModalController } from '@/lib/nuqs/use-edit-project-modal';

import {
  useCreateTaskModalController,
  useSetProjectId,
} from '@/lib/nuqs/use-create-task';
import { useWorkspaceId } from '@/hooks/useWorkspaceId';
import { useRouter } from 'next/navigation';

type Props = {
  documentId: string;

  children: React.ReactNode;
};

export const DocumentAction = ({ children, documentId }: Props) => {
  const workspaceId = useWorkspaceId();

  const { open } = useEditProjectModalController();
  const { open: createTask } = useCreateTaskModalController();
  const { onSetProjectId } = useSetProjectId();
  const [isOpen, setOpen] = useState(false);
  const router = useRouter();
  const isLoading = false;
  const onDelete = async () => {};

  const onOpenProject = () => {
    router.push(`/workspaces/${workspaceId}/projects/${documentId}`);
  };

  const onCreate = () => {
    createTask();
  };
  const onOpenDocuments = () => {
    router.push(`/workspaces/${workspaceId}/projects/${documentId}/documents`);
  };
  return (
    <>
      <ConfirmDialog
        isOpen={isOpen}
        setIsOpen={setOpen}
        onCancel={() => setOpen(false)}
        isSubmitting={isLoading}
        title="Delete project"
        subtitle="Are you sure you want to delete this project?, this action is irreversible."
        confirmButtonText="Delete"
        onConfirm={onDelete}
        btnColor={colors.red}
      />
      <div className="flex justify-end">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 text-black bg-white">
            <DropdownMenuItem
              onClick={onOpenProject}
              disabled={isLoading}
              className="font-medium p-[10px]"
            >
              <ExternalLink className="size-4 mr-2 stroke-2" />
              Open project
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => open(documentId)}
              disabled={isLoading}
              className="font-medium p-[10px]"
            >
              <Pencil className="size-4 mr-2 stroke-2" />
              Edit project
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={onOpenDocuments}
              disabled={isLoading}
              className="font-medium p-[10px]"
            >
              <File className="size-4 mr-2 stroke-2" />
              View documents
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={onCreate}
              disabled={isLoading}
              className="font-medium p-[10px]"
            >
              <Plus className="size-4 mr-2 stroke-2" />
              Create task
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => setOpen(true)}
              disabled={isLoading}
              className="text-amber-700 focus:text-amber-700 font-medium p-[10px]"
            >
              <Trash className="size-4 mr-2 stroke-2" />
              Delete project
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};
