'use client';

import { ErrorComponent } from '@/components/ui/error-component';
import { Heading } from '@/components/ui/heading';
import { Loading } from '@/components/ui/loading';
import { WrapperWithPadding } from '@/components/ui/wrapper-padding';
import { useGetWorkspaceDocuments } from '@/features/documents/api/use-get-workspace-documents';
import { DocumentTable } from '@/features/documents/components/document-table';
import { useFolderId } from '@/features/documents/hooks/useFolderId';
import { usePaginate } from '@/lib/nuqs/use-paginate-tickets';

export const FolderClient = () => {
  const folderId = useFolderId();
  const [page] = usePaginate();
  const { data, isPending, isError, refetch } = useGetWorkspaceDocuments({
    folderId,
    page: page.toString(),
  });
  if (isError) {
    return (
      <ErrorComponent
        message="Failed to get documents"
        reset={refetch}
        className="mt-20"
      />
    );
  }
  if (isPending) {
    return <Loading />;
  }
  return (
    <WrapperWithPadding className="bg-lightGrey">
      <div className="bg-white p-4 gap-y-5 min-h-full flex-1 flex flex-col">
        <Heading
          title="Documents"
          subTitle="Manage and upload workspace documents here"
        />

        <DocumentTable documents={data.documents} total={data.total} />
      </div>
    </WrapperWithPadding>
  );
};
