import { getLoggedInUser } from '@/features/auth/queries';
import { redirect } from 'next/navigation';
import { SettingsClient } from './client';

const WorkspaceSettingsPage = async () => {
  const { user } = await getLoggedInUser();

  if (!user) redirect('/signup');

  return <SettingsClient />;
};

export default WorkspaceSettingsPage;
