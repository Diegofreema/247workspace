'use client';

import { notFound } from 'next/navigation';

import { DocumentViewClient } from './client';

type Props = {
  params: {
    documentId: string;
  };
};

const DocumentIdPage = ({ params }: Props) => {
  if (!params.documentId) {
    return notFound();
  }

  return <DocumentViewClient documentId={params.documentId} />;
};

export default DocumentIdPage;
