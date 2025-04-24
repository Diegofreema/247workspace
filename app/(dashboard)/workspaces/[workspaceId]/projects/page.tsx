import { getLoggedInUser } from '@/features/auth/queries';
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react';
import { AllProjectPage } from './client';
import { WrapperWithPadding } from '@/components/ui/wrapper-padding';

const ProjectPage = async () => {
  const user = await getLoggedInUser();
  if (!user) redirect('/sign-up');
  return (
    <WrapperWithPadding className="bg-lightGrey">
      <Suspense fallback={null}>
        <AllProjectPage />
      </Suspense>
    </WrapperWithPadding>
  );
};

export default ProjectPage;
