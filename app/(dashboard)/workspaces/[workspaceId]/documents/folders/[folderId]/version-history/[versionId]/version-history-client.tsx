import { Heading } from '@/components/ui/heading';
import { WrapperWithPadding } from '@/components/ui/wrapper-padding';

export const VersionHistoryClient = () => {
  return (
    <WrapperWithPadding className="bg-lightGrey">
      <Heading
        title="Version History"
        subTitle="View all versions of this document"
      />
    </WrapperWithPadding>
  );
};
