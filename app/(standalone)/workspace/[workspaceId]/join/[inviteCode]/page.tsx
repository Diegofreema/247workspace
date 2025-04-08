import { JoinCard } from '@/components/cards/join-card';
import { getLoggedInUser } from '@/features/auth/queries';
import { getWorkspaceInfo } from '@/features/workspaces/queries';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

type Props = {
  params: { workspaceId: string };
};
const JoinPage = async ({ params }: Props) => {
  const user = await getLoggedInUser();

  if (!user) redirect('/sign-in');
  const initialValues = await getWorkspaceInfo({
    workspaceId: params.workspaceId,
  });
  if (!initialValues) {
    redirect('/');
  }

  return (
    <div className="w-full lg:max-w-xl flex flex-col gap-y-4">
      <Suspense fallback={null}>
        <JoinCard initialValue={initialValues} />
      </Suspense>
    </div>
  );
};

export default JoinPage;
