import { getLoggedInUser } from '@/features/auth/queries';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { HomeClient } from './client';
import { WrapperWithPadding } from '@/components/ui/wrapper-padding';

const WorkspacePage = async () => {
  const user = await getLoggedInUser();

  if (!user) redirect('/sign-up');
  return (
    <WrapperWithPadding className="bg-lightGrey">
      <Suspense fallback={null}>
        <HomeClient />
      </Suspense>
    </WrapperWithPadding>
  );
};

export default WorkspacePage;
