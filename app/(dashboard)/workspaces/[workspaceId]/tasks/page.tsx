import { WrapperWithPadding } from '@/components/ui/wrapper-padding';
import { getLoggedInUser } from '@/features/auth/queries';
import { TaskViewSwitcher } from '@/features/tasks/components/tasks-view-switcher';
import { getProfile } from '@/features/workspaces/queries';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

const page = async () => {
  const user = await getLoggedInUser();
  if (!user) redirect('/sign-in');
  const profile = await getProfile(user.$id);
  if (!profile) redirect('/sign-in');

  return (
    <WrapperWithPadding className="bg-lightGrey">
      <Suspense fallback={null}>
        <TaskViewSwitcher hideProjectFilter />
      </Suspense>
    </WrapperWithPadding>
  );
};

export default page;
