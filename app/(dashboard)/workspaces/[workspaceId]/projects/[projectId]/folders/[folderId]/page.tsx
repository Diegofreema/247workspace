import { getLoggedInUser } from '@/features/auth/queries';
import { DocumentViewClient } from './client';
import { redirect } from 'next/navigation';

const DocumentIdPage = async () => {
  const { user } = await getLoggedInUser();
  if (!user) {
    redirect('/signup');
  }
  return <DocumentViewClient />;
};

export default DocumentIdPage;
