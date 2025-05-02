import { protect } from '@/features/auth/queries';
import { redirect } from 'next/navigation';

const WorkspaceSettingsPage = async () => {
  const user = await protect();

  if (!user) redirect('/signup');

  return <div className="text-black">settings</div>;
};

export default WorkspaceSettingsPage;
