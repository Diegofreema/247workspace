import { protect } from '@/features/auth/queries';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { ProjectVersionClient } from './version-client';

const page = async () => {
  const user = await protect();

  if (!user) {
    redirect('/signup');
  }
  return (
    <div>
      <Suspense fallback={null}>
        <ProjectVersionClient />
      </Suspense>
    </div>
  );
};

export default page;
