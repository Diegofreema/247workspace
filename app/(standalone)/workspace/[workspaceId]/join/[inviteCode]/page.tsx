import { JoinCard } from '@/components/cards/join-card';
import { getWorkspaceInfo } from '@/features/workspaces/queries';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

type Props = {
  params: { workspaceId: string; inviteCode: string };
};
// http://localhost:3000/workspace/67f7076e0019f5e6239a/join/c5jYNCLShX
const JoinPage = async ({ params }: Props) => {
  const initialValues = await getWorkspaceInfo({
    workspaceId: params.workspaceId,
  });
  if (!initialValues) {
    redirect('/');
  }
  // ! add redirect back to join page
  return (
    <div className="w-full lg:max-w-xl flex flex-col gap-y-4">
      <Suspense fallback={null}>
        <JoinCard initialValue={initialValues} />
      </Suspense>
    </div>
  );
};

export default JoinPage;
