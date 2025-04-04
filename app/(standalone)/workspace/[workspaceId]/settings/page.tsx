import { getLoggedInUser } from '@/features/auth/queries';
import { redirect } from 'next/navigation';

const WorkspaceSettingsPage = async () => {
  const user = await getLoggedInUser();

  if (!user) redirect('/sign-in');
  return <div>WorkspaceSettingsPage</div>;
};

export default WorkspaceSettingsPage;
