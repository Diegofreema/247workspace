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

import { useEditTaskModalController } from '@/lib/nuqs/use-editi-task-modal-contoller';
import { useEditFolderModalController } from '../hooks/use-edit-folder-controller';

type Props = {
  folderId: string;
  children: React.ReactNode;
};

export const WorkspaceDocumentAction = ({ children, folderId }: Props) => {
  const { open } = useEditFolderModalController();

  const workspaceId = useWorkspaceId();
  const router = useRouter();

  const openFolder = () => {
    router.push(`/workspaces/${workspaceId}/documents/folders/${folderId}`);
  };

  return (
    <div className="flex justify-end cursor-pointer">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 text-black bg-white">
          <DropdownMenuItem
            onClick={openFolder}
            className="font-medium p-[10px]"
          >
            <ExternalLinkIcon className="size-4 mr-2 stroke-2" />
            Open folder
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => open(folderId)}
            className="font-medium p-[10px]"
          >
            <Pencil className="size-4 mr-2 stroke-2" />
            Edit folder
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
