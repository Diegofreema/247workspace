import { protect } from '@/features/auth/queries';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { DocumentViewClient } from './client';

const DocumentIdPage = async () => {
  const user = await protect();
  if (!user) {
    redirect('/signup');
  }
  return (
    <div>
      <Suspense fallback={null}>
        <DocumentViewClient />
      </Suspense>
    </div>
  );
};

export default DocumentIdPage;
