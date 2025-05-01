import React, { Suspense } from 'react';
import { DocumentClient } from './document-client';
import { getLoggedInUser } from '@/features/auth/queries';
import { redirect } from 'next/navigation';

const DocumentPage = async () => {
  const { user } = await getLoggedInUser();
  if (!user) {
    redirect('/signup');
  }
  return (
    <div>
      <Suspense fallback={null}>
        <DocumentClient />
      </Suspense>
    </div>
  );
};

export default DocumentPage;
