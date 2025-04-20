import { Button } from '@/components/custom/custom-button';
import { FlexBox } from '@/components/custom/flex-box';
import { colors } from '@/constants';
import { DocumentInput } from './document-search';
import { useProjectId } from '@/hooks/useProjectId';
import { useCreateDocumentModalController } from '@/lib/nuqs/use-create-document';

export const SearchSection = () => {
  const projectId = useProjectId();
  const { open } = useCreateDocumentModalController();
  return (
    <FlexBox
      alignItems={'center'}
      justifyContent={'space-between'}
      flexDir={{ base: 'column', md: 'row' }}
      gap={5}
    >
      <DocumentInput placeholder="Search by document name" />
      <Button
        px={4}
        py={1}
        bg={colors.purple}
        width={{ base: '100%', md: 'fit' }}
        color={colors.white}
        fontSize={'12px'}
        fontWeight={'bold'}
        onClick={() => open(projectId)}
      >
        Upload document
      </Button>
    </FlexBox>
  );
};
