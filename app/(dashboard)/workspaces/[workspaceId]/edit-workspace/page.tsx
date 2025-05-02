import { protect } from '@/features/auth/queries';
import { redirect } from 'next/navigation';

const EditWorkspacePage = async () => {
  const user = await protect();

  if (!user) redirect('/signup');
  return <div>EditWorkspace</div>;
};

export default EditWorkspacePage;
