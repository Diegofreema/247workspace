import CreateWorkspaceCard from '@/components/card/create-workspace-card';
import { protect } from '@/features/auth/queries';
import { redirect } from 'next/navigation';

const CreateWorkspacePage = async () => {
  const user = await protect();

  if (!user) redirect('/signup');
  return (
    <div>
      <CreateWorkspaceCard />
    </div>
  );
};

export default CreateWorkspacePage;
