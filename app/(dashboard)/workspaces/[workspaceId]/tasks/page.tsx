import { WrapperWithPadding } from '@/components/ui/wrapper-padding';
import { getLoggedInUser } from '@/features/auth/queries';
import { TaskViewSwitcher } from '@/features/tasks/components/tasks-view-switcher';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

const page = async () => {
  const { user } = await getLoggedInUser();
  if (!user) redirect('/signup');

  return (
    <WrapperWithPadding className="bg-lightGrey">
      <Suspense fallback={null}>
        <TaskViewSwitcher hideProjectFilter memberId={user.$id} />
      </Suspense>
    </WrapperWithPadding>
  );
};

export default page;
