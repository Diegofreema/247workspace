import React, { Suspense } from 'react';
import { DocumentClient } from './document-client';

const DocumentPage = () => {
  return (
    <div>
      <Suspense fallback={null}>
        <DocumentClient />
      </Suspense>
    </div>
  );
};

export default DocumentPage;
