import { getLoggedInUser } from '@/features/auth/queries';
import { redirect } from 'next/navigation';
import { DocumentClient } from './client';

const page = async () => {
  const user = await getLoggedInUser();
  if (!user) redirect('/sign-in');
  return <DocumentClient />;
};

export default page;
