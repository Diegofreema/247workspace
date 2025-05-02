import { WrapperWithPadding } from '@/components/ui/wrapper-padding';
import { protect } from '@/features/auth/queries';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { AllProjectPage } from './client';

const ProjectPage = async () => {
  const user = await protect();
  if (!user) redirect('/signup');
  return (
    <WrapperWithPadding className="bg-lightGrey">
      <Suspense fallback={null}>
        <AllProjectPage />
      </Suspense>
    </WrapperWithPadding>
  );
};

export default ProjectPage;
