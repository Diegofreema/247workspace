import { protect } from '@/features/auth/queries';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { TicketClient } from './client';

const TicketPage = async () => {
  const user = await protect();
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
