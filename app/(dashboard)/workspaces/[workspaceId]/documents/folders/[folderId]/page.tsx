import { protect } from '@/features/auth/queries';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { FolderClient } from './folder-client';

const FolderIdPage = async () => {
  const user = await protect();
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
