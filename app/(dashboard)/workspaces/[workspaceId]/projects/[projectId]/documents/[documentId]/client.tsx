import { Loading } from '@/components/ui/loading';
import { useGetDocument } from '@/features/documents/api/use-get-document';
import React from 'react';

type Props = {
  documentId: string;
};

export const DocumentViewClient = ({ documentId }: Props) => {
  const { data, isPending, isError } = useGetDocument({
    documentId: documentId,
  });

  if (isError) {
    close();
    throw new Error('Failed to get document');
  }
  if (isPending) {
    return <Loading />;
  }

  console.log(data?.documentUrl);
  return <div>DocumentClient</div>;
};
