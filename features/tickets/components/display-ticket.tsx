import { Heading } from '@/components/ui/heading';
import { TicketWithProfile } from '@/types';
import React from 'react';
import { TicketTable } from './ticket-table';

type Props = {
  tickets: TicketWithProfile[];
  total: number;
};

export const DisplayTicket = ({ tickets, total }: Props) => {
  return (
    <div className="bg-white min-h-screen p-5">
      <Heading title="All tickets" subTitle="View all raised tickets" />
      <TicketTable tickets={tickets} total={total} />
    </div>
  );
};
