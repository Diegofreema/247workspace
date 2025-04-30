import { WorkspaceFolderType } from '@/types';
import { For, SimpleGrid, Stack } from '@chakra-ui/react';
import { useInView } from 'react-intersection-observer';
import { FolderCard } from './folder-card';
import { LoaderCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { useOffsetWorkspaceFolder } from '@/lib/nuqs/use-workspace-folder-more';

type Props = {
  folders: WorkspaceFolderType[];
  total: number;
};

export const Folders = ({ folders, total }: Props) => {
  const hasNextPage = total > folders.length;
  const [loading, setLoading] = useState(false);
  const { setMore } = useOffsetWorkspaceFolder();
  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage && !loading) {
      setLoading(true);
      setMore((prev) => prev + 10);
    } else {
      setLoading(false);
    }
  }, [hasNextPage, inView, loading, setMore]);

  return (
    <Stack>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 4 }}
        gap={{ base: 5, md: 10 }}
        flex={1}
      >
        <For each={folders}>
          {(item) => <FolderCard folder={item} key={item.$id} />}
        </For>
      </SimpleGrid>
      {hasNextPage && (
        <div ref={ref} className={cn('mt-auto flex justify-center')}>
          <LoaderCircle className="animate-spin text-purple" size={30} />
        </div>
      )}
    </Stack>
  );
};
