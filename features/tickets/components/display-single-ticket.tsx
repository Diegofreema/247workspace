import { TicketInfoCard } from '@/features/tickets/components/ticket-info-card';
import { Profile, TicketsType } from '@/types';
import { Stack } from '@chakra-ui/react';
import { Comments } from './comments';

type Props = {
  data: {
    ticket: TicketsType;
    assignee: Profile;
    raisedBy: Profile;
  };
  profileId: string;
};

export const DisplaySingleTicket = ({ data, profileId }: Props) => {
  return (
    <Stack mx={'auto'} maxW={{ base: '100%', md: '70%', lg: '50%' }} gap={4}>
      <TicketInfoCard ticket={data?.ticket} profileId={profileId} />
      <Comments ticketId={data?.ticket?.$id} profileId={profileId} />
    </Stack>
  );
};
