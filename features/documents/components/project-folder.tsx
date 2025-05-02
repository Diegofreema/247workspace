import { useOffsetWorkspaceFolder } from '@/lib/nuqs/use-workspace-folder-more';
import { cn } from '@/lib/utils';
import { ProjectFolderType } from '@/types';
import { For, SimpleGrid, Stack } from '@chakra-ui/react';
import { LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { ProjectFolderCard } from './project-folder-card';

type Props = {
  folders: ProjectFolderType[];
  total: number;
};

export const ProjectFolders = ({ folders, total }: Props) => {
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
    <Stack mt={{ base: 10, md: 20 }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 4 }}
        gap={{ base: 5, md: 10 }}
        flex={1}
      >
        <For each={folders}>
          {(item) => <ProjectFolderCard folder={item} key={item.$id} />}
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
