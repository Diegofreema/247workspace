import { getLoggedInUser } from '@/features/auth/queries';
import { getWorkspace } from '@/features/workspaces/queries';
import { redirect } from 'next/navigation';

const WorkspaceSettingsPage = async () => {
  const user = await getLoggedInUser();

  if (!user) redirect('/sign-in');

  return <div className="text-black">settings</div>;
};

export default WorkspaceSettingsPage;
