'use client';
import { CreateButton } from '@/components/buttons/create-button';
import { FlexBox } from '@/components/custom/flex-box';
import { ErrorComponent } from '@/components/ui/error-component';
import { Heading } from '@/components/ui/heading';
import { Loading } from '@/components/ui/loading';
import { WrapperWithPadding } from '@/components/ui/wrapper-padding';
import { useGetVersionHistoryDocuments } from '@/features/documents/api/use-get-version-documents';
import { VersionTable } from '@/features/documents/components/workspace-version-table';
import { useVersionModalController } from '@/features/documents/hooks/use-version-modal-controller';
import { useVersionId } from '@/features/documents/hooks/useVersionId';
import { usePaginate } from '@/lib/nuqs/use-paginate-tickets';

export const VersionHistoryClient = () => {
  const versionId = useVersionId();
  const { open } = useVersionModalController();
  const [page] = usePaginate();
  const { data, isPending, isError, refetch } = useGetVersionHistoryDocuments({
    versionId,
    page: page.toString(),
  });
  if (isError) {
    return (
      <ErrorComponent reset={refetch} message="Failed to get version history" />
    );
  }

  if (isPending) {
    return <Loading />;
  }
  return (
    <WrapperWithPadding className="bg-lightGrey">
      <div className="space-y-5 bg-white p-5">
        <Heading
          title="Version History"
          subTitle="View all versions of this document"
        />
        <FlexBox justifyContent={'flex-end'}>
          <CreateButton
            text="Upload a new version"
            onClick={() => open(versionId)}
            width={{ base: '100%', md: 'fit-content' }}
          />
        </FlexBox>
        <VersionTable documents={data.documents} total={data.total} />
      </div>
    </WrapperWithPadding>
  );
};
