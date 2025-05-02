import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useWorkspaceId } from '@/hooks/useWorkspaceId';
import { ExternalLinkIcon, Pencil } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

import {
  useEditFolderModalController,
  useEditProjectFolderModalController,
} from '../hooks/use-edit-folder-controller';
import {
  useEditProjectFolderStore,
  useEditWorkspaceFolderStore,
} from '../store/edit-workspace-folder-store';

type Props = {
  folderId: string;
  folderName: string;
  children: React.ReactNode;
};

export const WorkspaceDocumentAction = ({
  children,
  folderId,
  folderName,
}: Props) => {
  const { open } = useEditFolderModalController();
  const setValue = useEditWorkspaceFolderStore((state) => state.setValue);
  const workspaceId = useWorkspaceId();
  const router = useRouter();

  const openFolder = () => {
    router.push(`/workspaces/${workspaceId}/documents/folders/${folderId}`);
  };

  const editFolder = () => {
    setValue(folderName);
    open(folderId);
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
            onClick={editFolder}
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
export const ProjectDocumentAction = ({
  children,
  folderId,
  folderName,
}: Props) => {
  const { open } = useEditProjectFolderModalController();
  const setValue = useEditProjectFolderStore((state) => state.setValue);
  const pathname = usePathname();
  const workspaceId = useWorkspaceId();
  const router = useRouter();

  const openFolder = () => {
    router.push(`/workspaces/${workspaceId}/documents/folders/${folderId}`);
  };

  const editFolder = () => {
    setValue(folderName);
    open(folderId);
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
            onClick={editFolder}
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
