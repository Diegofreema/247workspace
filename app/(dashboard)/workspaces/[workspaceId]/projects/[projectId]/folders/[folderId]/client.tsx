import { Loading } from '@/components/ui/loading';
import { useGetDocument } from '@/features/documents/api/use-get-document';
import React from 'react';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import '@cyntler/react-doc-viewer/dist/index.css';
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

  const documents = [{ uri: data.document.documentUrl }];

  return (
    <DocViewer
      documents={documents}
      pluginRenderers={DocViewerRenderers}
      style={{
        height: 1000,
      }}
    />
  );
};
