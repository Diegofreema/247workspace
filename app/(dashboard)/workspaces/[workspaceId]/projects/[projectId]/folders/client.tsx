'use client';

import { ErrorComponent } from '@/components/ui/error-component';
import { Loading } from '@/components/ui/loading';
import { WrapperWithPadding } from '@/components/ui/wrapper-padding';
import { useGetProjectFolders } from '@/features/documents/api/use-get-project-folder';

import { ProjectFolderDisplay } from '@/features/documents/components/project-folder-display';
import { useSearchProjectFolder } from '@/features/documents/hooks/use-search-folder';
import { useProjectId } from '@/hooks/useProjectId';
import { useOffsetProjectFolder } from '@/lib/nuqs/use-workspace-folder-more';

export const DocumentClient = () => {
  const projectId = useProjectId();
  console.log({ projectId });

  const { more } = useOffsetProjectFolder();
  const { value } = useSearchProjectFolder();
  const { data, isPending, isError, refetch } = useGetProjectFolders({
    projectId,
    more: more.toString(),
    searchQuery: value,
  });
  console.log(data);

  if (isError) {
    return <ErrorComponent message="Failed to get documents" reset={refetch} />;
  }

  if (isPending) {
    return <Loading />;
  }

  return (
    <WrapperWithPadding className="bg-lightGrey">
      <ProjectFolderDisplay folders={data.documents} total={data.total} />
    </WrapperWithPadding>
  );
};
