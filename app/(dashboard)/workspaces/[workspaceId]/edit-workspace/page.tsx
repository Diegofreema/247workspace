import { getLoggedInUser } from '@/features/auth/queries';
import { redirect } from 'next/navigation';

const EditWorkspacePage = async () => {
  const user = await getLoggedInUser();

  if (!user) redirect('/sign-in');
  return <div>EditWorkspace</div>;
};

export default EditWorkspacePage;
