import { getLoggedInUser } from '@/features/auth/queries';
import { redirect } from 'next/navigation';

const WorkspaceSettingsPage = async () => {
  const user = await getLoggedInUser();

  if (!user) redirect('/signup');

  return <div className="text-black">settings</div>;
};

export default WorkspaceSettingsPage;
