import { getLoggedInUser, protect } from '@/features/auth/queries';
import { getProfile, getWorkspace } from '@/features/workspaces/queries';
import { redirect } from 'next/navigation';

const WorkspaceHomePage = async () => {
  const user = await protect();
  const { workspaces } = await getLoggedInUser();
  const profile = await getProfile(user?.$id);

  if (!user) redirect('/signup');

  if (!profile) redirect('/onboard');

  if (workspaces.total === 0) {
    return redirect('/workspace/create-workspace');
  } else {
    return redirect(`/workspaces/${workspaces.documents[0].$id}/home`);
  }
};

export default WorkspaceHomePage;
