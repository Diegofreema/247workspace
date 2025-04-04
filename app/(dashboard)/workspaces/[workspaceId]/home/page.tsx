import { getLoggedInUser } from '@/features/auth/queries';
import { redirect } from 'next/navigation';
import React from 'react';

const WorkspacePage = async () => {
  const user = await getLoggedInUser();

  if (!user) redirect('/sign-in');
  return <div>WorkspacePage</div>;
};

export default WorkspacePage;
