import { Heading } from '@/components/ui/heading';
import { TicketWithProfile } from '@/types';
import React from 'react';
import { TicketTable } from './ticket-table';
import { FlexBox } from '@/components/custom/flex-box';
import { Button } from '@/components/custom/custom-button';
import { colors } from '@/constants';
import { DataFilter } from '@/components/ui/data-filter';
import { TicketFilter } from './ticket-filter';

type Props = {
  tickets: TicketWithProfile[];
  total: number;
};

export const DisplayTicket = ({ tickets, total }: Props) => {
  const allAssignees = tickets.map((ticket) => {
    return {
      label: ticket.assignee?.name || 'Unassigned',
      value: ticket.assignee?.id || 'unassigned',
    };
  });
  return (
    <div className="bg-white min-h-screen p-5">
      <Heading title="All tickets" subTitle="View all raised tickets" />
      <div className="mb-5 md:mb-10" />
      <FlexBox
        justifyContent={{ base: 'start', md: 'space-between' }}
        gap={2}
        flexDir={{ base: 'column', md: 'row' }}
        mt={3}
      >
        <TicketFilter allAssignees={allAssignees} />
        <Button
          color={colors.white}
          bg={colors.purple}
          variant={'solid'}
          px={2}
          width={{ base: '100%', md: 'fit' }}
          onClick={() => {}}
        >
          Raise ticket
        </Button>
      </FlexBox>
      <div className="mb-3 md:mb-5" />

      <TicketTable tickets={tickets} total={total} />
    </div>
  );
};
