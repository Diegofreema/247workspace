import { Suspense } from 'react';
import { TicketClient } from './client';
import { getLoggedInUser } from '@/features/auth/queries';
import { redirect } from 'next/navigation';

const TicketPage = async () => {
  const { user } = await getLoggedInUser();
  if (!user) {
    redirect('/signup');
  }
  return (
    <div>
      <Suspense fallback={null}>
        <TicketClient />
      </Suspense>
    </div>
  );
};

export default TicketPage;
