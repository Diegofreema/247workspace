import { JoinCard } from '@/components/cards/join-card';
import { getWorkspaceInfo } from '@/features/workspaces/queries';
import { Suspense } from 'react';

type Props = {
  params: { workspaceId: string; inviteCode: string };
};

const JoinPage = async ({ params }: Props) => {
  const initialValues = await getWorkspaceInfo({
    workspaceId: params.workspaceId,
  });

  return (
    <div className="w-full lg:max-w-xl flex flex-col gap-y-4">
      <Suspense fallback={null}>
        <JoinCard name={initialValues?.name} inviteCode={params?.inviteCode} />
      </Suspense>
    </div>
  );
};

export default JoinPage;
