import { protect } from '@/features/auth/queries';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { DocumentClient } from './document-client';

const DocumentPage = async () => {
  const user = await protect();
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
