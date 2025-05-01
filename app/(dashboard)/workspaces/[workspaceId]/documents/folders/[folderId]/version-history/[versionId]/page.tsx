import React, { Suspense } from 'react';
import { VersionHistoryClient } from './version-history-client';
import { getLoggedInUser } from '@/features/auth/queries';
import { redirect } from 'next/navigation';

const VersionHistoryPage = async () => {
  const { user } = await getLoggedInUser();
  if (!user) {
    redirect('/signup');
  }
  return (
    <div>
      <Suspense fallback={null}>
        <VersionHistoryClient />
      </Suspense>
    </div>
  );
};

export default VersionHistoryPage;
