'use client';

import { ErrorComponent } from '@/components/ui/error-component';
import { Loading } from '@/components/ui/loading';
import { WrapperWithPadding } from '@/components/ui/wrapper-padding';
import { useGetWorkspaceFolders } from '@/features/documents/api/use-get-workspace-folders';
import { WorkspaceDocumentDisplay } from '@/features/documents/components/workspace-document-display';
import { useSearchFolder } from '@/features/documents/hooks/use-search-folder';
import { useWorkspaceId } from '@/hooks/useWorkspaceId';
import { useOffsetWorkspaceFolder } from '@/lib/nuqs/use-workspace-folder-more';
import React from 'react';

export const DocumentClient = () => {
  const workspaceId = useWorkspaceId();
  const { more } = useOffsetWorkspaceFolder();
  const { value } = useSearchFolder();

  const { data, isPending, isError, refetch } = useGetWorkspaceFolders({
    workspaceId,
    more: more.toString(),
    searchQuery: value || '',
  });
  if (isError) {
    return (
      <ErrorComponent
        message="Failed to get folders"
        reset={refetch}
        className="mt-10"
      />
    );
  }

  if (isPending) {
    return <Loading />;
  }
  return (
    <WrapperWithPadding className="bg-lightGrey">
      <WorkspaceDocumentDisplay folders={data.documents} total={data.total} />
    </WrapperWithPadding>
  );
};
