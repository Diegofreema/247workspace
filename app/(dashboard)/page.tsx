import { getLoggedInUser } from '@/features/auth/queries';
import { redirect } from 'next/navigation';

const WorkspaceHomePage = async () => {
  const { user, profile, workspaces } = await getLoggedInUser();

  if (!user) redirect('/signup');

  if (!profile) redirect('/onboard');

  if (workspaces.total === 0) {
    return redirect('/workspace/create-workspace');
  } else {
    return redirect(`/workspaces/${workspaces.documents[0].$id}/home`);
  }
};

export default WorkspaceHomePage;
