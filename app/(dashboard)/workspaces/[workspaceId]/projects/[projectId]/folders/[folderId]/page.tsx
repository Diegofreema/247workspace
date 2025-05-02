import { getLoggedInUser } from '@/features/auth/queries';
import { DocumentViewClient } from './client';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

const DocumentIdPage = async () => {
  const { user } = await getLoggedInUser();
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
