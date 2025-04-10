import { getLoggedInUser } from '@/features/auth/queries';
import { MemberList } from '@/features/members/components/member-list';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

const page = async () => {
  const user = await getLoggedInUser();
  if (!user) {
    redirect('/sign-in');
  }
  const userId = user.$id;
  return (
    <div className="text-black p-6">
      <Suspense fallback={null}>
        <MemberList userId={userId} />
      </Suspense>
    </div>
  );
};

export default page;
