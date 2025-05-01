import React, { Suspense } from 'react';
import { FolderClient } from './folder-client';
import { getLoggedInUser } from '@/features/auth/queries';
import { redirect } from 'next/navigation';

const FolderIdPage = async () => {
  const { user } = await getLoggedInUser();
  if (!user) {
    redirect('/signup');
  }
  return (
    <div>
      <Suspense fallback={null}>
        <FolderClient />
      </Suspense>
    </div>
  );
};

export default FolderIdPage;
