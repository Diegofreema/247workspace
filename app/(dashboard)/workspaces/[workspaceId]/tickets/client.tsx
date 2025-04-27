'use client';

import { WrapperWithPadding } from '@/components/ui/wrapper-padding';
import { DisplayTicket } from '@/features/tickets/components/display-ticket';

export const TicketClient = () => {
  return (
    <WrapperWithPadding className="bg-lightGrey">
      <DisplayTicket />
    </WrapperWithPadding>
  );
};
