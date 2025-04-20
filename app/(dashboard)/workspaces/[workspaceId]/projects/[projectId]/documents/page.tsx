import { redirect } from 'next/navigation';
import React, { Suspense } from 'react';

import { getLoggedInUser } from '@/features/auth/queries';
import { DocumentClient } from './client';

const DocumentPage = async () => {
  const user = await getLoggedInUser();
  if (!user) redirect('/sign-in');
  return (
    <div>
      <Suspense fallback={null}>
        <DocumentClient />
      </Suspense>
    </div>
  );
};

export default DocumentPage;
