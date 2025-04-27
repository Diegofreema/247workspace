import { WrapperWithPadding } from '@/components/ui/wrapper-padding';
import { TicketClient } from './client';
import { Suspense } from 'react';

const TicketPage = () => {
  return (
    <div>
      <Suspense fallback={null}>
        <TicketClient />
      </Suspense>
    </div>
  );
};

export default TicketPage;
