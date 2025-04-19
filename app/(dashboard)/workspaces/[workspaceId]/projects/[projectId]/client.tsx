'use client';

import { CardSkeleton } from '@/components/skeletons/card-skeleton';
import { Analytics } from '@/components/ui/analytics';
import { useGetProjectAnalytics } from '@/features/projects/api/use-get-project-analytics';
import { useProjectId } from '@/hooks/useProjectId';
import { SimpleGrid } from '@chakra-ui/react';

export const ProjectClient = () => {
  const projectId = useProjectId();
  const { data, isError, isPending } = useGetProjectAnalytics({ projectId });

  if (isError) {
    throw new Error('Failed to get project analytics');
  }

  if (isPending) {
    return (
      <SimpleGrid
        gap={{ base: 4, md: 8 }}
        columns={{ base: 1, md: 2, lg: 5 }}
        mt={4}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </SimpleGrid>
    );
  }
  return <Analytics data={data} />;
};
