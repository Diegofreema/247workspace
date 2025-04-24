import CreateWorkspaceCard from '@/components/card/create-workspace-card';
import { getLoggedInUser } from '@/features/auth/queries';
import { redirect } from 'next/navigation';

const CreateWorkspacePage = async () => {
  const { user } = await getLoggedInUser();

  if (!user) redirect('/signup');
  return (
    <div>
      <CreateWorkspaceCard />
    </div>
  );
};

export default CreateWorkspacePage;
