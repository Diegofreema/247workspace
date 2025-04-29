import { Profile, TicketsType } from '@/types';
import { Box } from '@chakra-ui/react';
import { TicketInfoCard } from '@/features/tickets/components/ticket-info-card';

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
    <Box mx={'auto'} maxW={{ base: '100%', md: '70%', lg: '50%' }} bg={'white'}>
      <TicketInfoCard ticket={data?.ticket} profileId={profileId} />
    </Box>
  );
};
