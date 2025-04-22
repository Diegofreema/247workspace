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

type Props = {
  documentId: string;

  children: React.ReactNode;
  url: string;
};

export const DocumentAction = ({ children, documentId, url }: Props) => {
  const workspaceId = useWorkspaceId();
  const projectId = useProjectId();
  //   console.log(url);
  const { mutateAsync, isPending } = useDeleteDocument();
  const [isOpen, setOpen] = useState(false);
  const router = useRouter();
  const isLoading = isPending;
  const onDelete = async () => {
    await mutateAsync(
      { param: { documentId } },
      {
        onSuccess: () => {
          setOpen(false);
        },
      }
    );
  };

  const onOpenProject = () => {};

  const onDownload = () => {};
  const onOpenDocuments = () => {
    router.push(
      `/workspaces/${workspaceId}/projects/${projectId}/documents/${documentId}`
    );
  };

  return (
    <>
      <ConfirmDialog
        isOpen={isOpen}
        setIsOpen={setOpen}
        onCancel={() => setOpen(false)}
        isSubmitting={isLoading}
        title="Delete document"
        subtitle="Are you sure you want to delete this document?, this action is irreversible."
        confirmButtonText="Delete"
        onConfirm={onDelete}
        btnColor={colors.red}
      />
      <div className="flex justify-end">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 text-black bg-white">
            {/* <DropdownMenuItem
              disabled={isLoading}
              className="font-medium p-[10px]"
              onClick={onOpenDocuments}
            >
              
              View
            </DropdownMenuItem> */}
            <DropdownMenuItem
              onClick={onDownload}
              disabled={isLoading}
              className="font-medium p-[10px]"
              asChild
            >
              <Link href={url} download target="_blank">
                <File className="size-4 mr-2 stroke-2" />
                View
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => setOpen(true)}
              disabled={isLoading}
              className="text-amber-700 focus:text-amber-700 font-medium p-[10px]"
            >
              <Trash className="size-4 mr-2 stroke-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};
