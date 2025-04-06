import { EditWorkspaceCard } from '@/components/cards/edit-workspace-card';
import { getLoggedInUser } from '@/features/auth/queries';
import { getWorkspace } from '@/features/workspaces/queries';
import { notFound, redirect } from 'next/navigation';
import { Suspense } from 'react';

type Props = {
  params: { workspaceId: string };
};
const WorkspaceSettingsPage = async ({ params }: Props) => {
  const user = await getLoggedInUser();

  if (!user) redirect('/sign-in');
  const initialValues = await getWorkspace({ workspaceId: params.workspaceId });
  if (!initialValues) {
    return notFound();
  }
  return (
    <div className="w-full lg:max-w-xl">
      <Suspense fallback={null}>
        <EditWorkspaceCard initialValue={initialValues} />
      </Suspense>
    </div>
  );
};

export default WorkspaceSettingsPage;
