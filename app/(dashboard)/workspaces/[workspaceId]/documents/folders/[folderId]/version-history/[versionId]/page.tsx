import { protect } from '@/features/auth/queries';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { VersionHistoryClient } from './version-history-client';

const VersionHistoryPage = async () => {
  const user = await protect();
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
