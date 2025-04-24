import { getLoggedInUser } from '@/features/auth/queries';
import { redirect } from 'next/navigation';

const ProfilePage = async () => {
  const { user } = await getLoggedInUser();
  if (!user) redirect('/signup');
  return <div>ProfilePage</div>;
};

export default ProfilePage;
