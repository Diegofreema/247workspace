import { getLoggedInUser } from '@/features/auth/queries';
import { getWorkspaces } from '@/features/workspaces/queries';
import { redirect } from 'next/navigation';

const WorkspaceHomePage = async () => {
  const user = await getLoggedInUser();

  if (!user) redirect('/sign-in');
  const workspaces = await getWorkspaces();

  if (workspaces.total === 0) {
    return redirect('/workspace/create-workspace');
  } else {
    return redirect(`/workspaces/${workspaces.documents[0].$id}/home`);
  }
};

export default WorkspaceHomePage;
