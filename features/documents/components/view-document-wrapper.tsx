'use client';

import { ReusableSkeleton } from '@/components/skeletons/link-skeleton';
import { colors } from '@/constants';
import { Card, Stack } from '@chakra-ui/react';
import { useGetDocument } from '../api/use-get-document';

type Props = {
  documentId: string;
  close: () => void;
};
export const ViewDocumentWrapper = ({ documentId, close }: Props) => {
  const { data, isPending, isError } = useGetDocument({
    documentId: documentId!,
  });

  if (isError) {
    close();
    throw new Error('Failed to get document');
  }
  if (isPending) {
    return (
      <Stack mt={5}>
        <ReusableSkeleton height="300px" />
      </Stack>
    );
  }
  console.log(data);

  return (
    <Card.Root bg={'transparent'} boxShadow={'none'}>
      <Card.Body gap="2">
        <Card.Title
          mt="2"
          color={colors.black}
          fontSize={'30px'}
          display={'flex'}
        >
          {data.name}
        </Card.Title>
      </Card.Body>
    </Card.Root>
  );
};
