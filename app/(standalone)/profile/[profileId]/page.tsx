import { getLoggedInUser, protect } from '@/features/auth/queries';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { ProfilePageClient } from './client';

const ProfilePage = async () => {
  const user = await protect();
  if (!user) redirect('/signup');
  return (
    <div className="w-full bg-red-500">
      <Suspense fallback={null}>
        <ProfilePageClient />
      </Suspense>
    </div>
  );
};

export default ProfilePage;
