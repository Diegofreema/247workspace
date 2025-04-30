'use client';

import { ErrorComponent } from '@/components/ui/error-component';
import { Heading } from '@/components/ui/heading';
import { Loading } from '@/components/ui/loading';
import { WrapperWithPadding } from '@/components/ui/wrapper-padding';

import { DocumentTable } from '@/features/documents/components/document-table';
import { SearchSection } from '@/features/documents/components/search-section';
import { useProjectId } from '@/hooks/useProjectId';

export const DocumentClient = () => {
  // const projectId = useProjectId();
  // const { data, isPending, isError, refetch } = useGetDocuments({ projectId });

  // if (isError) {
  //   return <ErrorComponent message="Failed to get documents" reset={refetch} />;
  // }

  // if (isPending) {
  //   return <Loading />;
  // }

  return (
    <WrapperWithPadding className="bg-lightGrey">
      <div className="bg-white p-4 gap-y-5 min-h-full flex-1 flex flex-col">
        <Heading
          title="Documents"
          subTitle="Manage and upload project documents here"
        />
        <SearchSection />
        {/* <DocumentTable documents={data.documents} total={data.total} /> */}
      </div>
    </WrapperWithPadding>
  );
};
