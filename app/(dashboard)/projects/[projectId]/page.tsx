import { getLoggedInUser } from '@/features/auth/actions';
import { redirect } from 'next/navigation';

const page = async () => {
  const user = await getLoggedInUser();

  if (!user) redirect('/sign-in');
  return <div className="text-black">projects</div>;
};

export default page;
