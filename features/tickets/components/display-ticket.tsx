import { Heading } from '@/components/ui/heading';
import React from 'react';

type Props = {};

export const DisplayTicket = (props: Props) => {
  return (
    <div className="bg-white min-h-screen p-5">
      <Heading title="All tickets" subTitle="View all raised tickets" />
    </div>
  );
};
