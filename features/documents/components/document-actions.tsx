import { ConfirmDialog } from '@/components/modals/confirm-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { colors } from '@/constants';
import { Download, File, Trash } from 'lucide-react';
import { useState } from 'react';

import { useRouter } from 'next/navigation';
import { useWorkspaceId } from '@/hooks/useWorkspaceId';
import { useProjectId } from '@/hooks/useProjectId';
import { Link } from 'next-view-transitions';
import { useDeleteDocument } from '../api/use-delete';
import { IconHistory, IconShare2 } from '@tabler/icons-react';
import { toaster } from '@/components/ui/toaster';

type Props = {
  documentId: string;

  children: React.ReactNode;
  url: string;
};

export const DocumentAction = ({ children, documentId, url }: Props) => {
  const workspaceId = useWorkspaceId();
  const projectId = useProjectId();
  //   console.log(url);

  const router = useRouter();

  const goToVersionPage = () => {
    router.push(
      `/workspaces/${workspaceId}/projects/${projectId}/documents/${documentId}`
    );
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      // Optional: Show success message
      toaster.create({
        title: 'Copied to clipboard',
        description: 'The link has been copied to your clipboard.',
        type: 'info',
      });
    } catch (err) {
      toaster.create({
        title: 'Error',
        description: 'Failed to copy link to clipboard.',
        type: 'error',
      });
    }
  };

  return (
    <div className="flex justify-end">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 text-black bg-white">
          <DropdownMenuItem className="font-medium p-[10px]" asChild>
            <Link href={url} download target="_blank">
              <File className="size-4 mr-2 stroke-2" />
              View
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={goToVersionPage}
            className="font-medium p-[10px]"
            asChild
          >
            <Link href={url} download target="_blank">
              <IconHistory className="size-4 mr-2 stroke-2" />
              Version history
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={copyToClipboard}
            className="font-medium p-[10px]"
          >
            <IconShare2 className="size-4 mr-2 stroke-2" />
            Share document
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
