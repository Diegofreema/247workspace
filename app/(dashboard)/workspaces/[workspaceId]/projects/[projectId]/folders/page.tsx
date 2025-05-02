import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import { protect } from '@/features/auth/queries';
import { DocumentClient } from './client';

const DocumentPage = async () => {
  const user = await protect();
  if (!user) redirect('/signup');
  return (
    <div>
      <Suspense fallback={null}>
        <DocumentClient />
      </Suspense>
    </div>
  );
};

export default DocumentPage;
