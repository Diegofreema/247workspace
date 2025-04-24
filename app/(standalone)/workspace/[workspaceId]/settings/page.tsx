import { DeleteWorkspaceCard } from '@/components/cards/delete-workspace-card';
import { EditWorkspaceCard } from '@/components/cards/edit-workspace-card';
import { InviteCodeCard } from '@/components/cards/invite-code-card';
import { getLoggedInUser } from '@/features/auth/queries';
import { getWorkspace } from '@/features/workspaces/queries';
import { notFound, redirect } from 'next/navigation';
import { Suspense } from 'react';

type Props = {
  params: { workspaceId: string };
};
const WorkspaceSettingsPage = async ({ params }: Props) => {
  const user = await getLoggedInUser();

  if (!user) redirect('/sign-up');
  const initialValues = await getWorkspace({ workspaceId: params.workspaceId });
  if (!initialValues) {
    return notFound();
  }
  return (
    <div className="w-full lg:max-w-xl flex flex-col gap-y-4">
      <Suspense fallback={null}>
        <EditWorkspaceCard initialValue={initialValues} />
      </Suspense>
      <Suspense fallback={null}>
        <DeleteWorkspaceCard />
      </Suspense>
      <Suspense fallback={null}>
        <InviteCodeCard
          inviteCode={initialValues.inviteCode}
          workspaceId={initialValues.$id}
        />
      </Suspense>
    </div>
  );
};

export default WorkspaceSettingsPage;
