import { protect } from '@/features/auth/queries';
import { redirect } from 'next/navigation';
import { SettingsClient } from './client';

const WorkspaceSettingsPage = async () => {
  const user = await protect();

  if (!user) redirect('/signup');

  return <SettingsClient />;
};

export default WorkspaceSettingsPage;
