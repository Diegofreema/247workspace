'use client';

import { DeleteWorkspaceCard } from '@/components/cards/delete-workspace-card';
import { EditWorkspaceCard } from '@/components/cards/edit-workspace-card';
import { InviteCodeCard } from '@/components/cards/invite-code-card';
import { ErrorComponent } from '@/components/ui/error-component';
import { Loading } from '@/components/ui/loading';
import { useGetWorkspace } from '@/features/workspaces/api/use-get-workspace';
import { useWorkspaceId } from '@/hooks/useWorkspaceId';

export const SettingsClient = () => {
  const workspaceId = useWorkspaceId();
  const { data, isPending, isError, refetch } = useGetWorkspace({
    workspaceId,
  });
  if (isError) {
    return (
      <ErrorComponent
        message="Failed to get workspace settings"
        reset={refetch}
      />
    );
  }

  if (isPending) {
    return <Loading />;
  }
  return (
    <div className="w-full lg:max-w-xl flex flex-col gap-y-4">
      <EditWorkspaceCard initialValue={data} />

      <DeleteWorkspaceCard />

      <InviteCodeCard inviteCode={data.inviteCode} workspaceId={data.$id} />
    </div>
  );
};
