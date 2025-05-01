import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { File } from 'lucide-react';

import { toaster } from '@/components/ui/toaster';
import { useProjectId } from '@/hooks/useProjectId';
import { useWorkspaceId } from '@/hooks/useWorkspaceId';
import { IconHistory, IconShare2 } from '@tabler/icons-react';
import { Link } from 'next-view-transitions';
import { usePathname, useRouter } from 'next/navigation';

type Props = {
  versionId: string;

  children: React.ReactNode;
  url: string;
  hideVersionHistory?: boolean;
};

export const DocumentAction = ({
  children,
  versionId,
  url,
  hideVersionHistory,
}: Props) => {
  const pathname = usePathname();
  //   console.log(url);

  const router = useRouter();

  const goToVersionPage = () => {
    router.push(`${pathname}/version-history/${versionId}`);
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
          {!hideVersionHistory && (
            <DropdownMenuItem
              onClick={goToVersionPage}
              className="font-medium p-[10px]"
            >
              <IconHistory className="size-4 mr-2 stroke-2" />
              Version history
            </DropdownMenuItem>
          )}

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
