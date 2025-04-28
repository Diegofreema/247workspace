import { EditTicketForm } from '@/components/form/edit-ticket-form';
import { ReusableSkeleton } from '@/components/skeletons/link-skeleton';
import { useCurrentUser } from '@/features/auth/api/use-current-user';
import { useGetProfiles } from '@/features/members/api/use-profile';
import { useWorkspaceId } from '@/hooks/useWorkspaceId';
import { Stack } from '@chakra-ui/react';
import { useGetTicket } from '../api/use-get-ticket';

type Props = {
  ticketId: string;
};

const array = Array(7).fill(0);
export const EditTicketWrapper = ({ ticketId }: Props) => {
  const workspaceId = useWorkspaceId();
  const {
    data: ticketData,
    isPending: ticketIsPending,
    isError: ticketIsError,
  } = useGetTicket({ ticketId });
  const {
    data,
    isPending: isPendingProfile,
    isError: isErrorProfile,
  } = useCurrentUser();
  const {
    data: profiles,
    isPending: isPendingProfiles,
    isError: isErrorProfiles,
  } = useGetProfiles({
    workspaceId,
  });

  const isLoading = isPendingProfile || isPendingProfiles || ticketIsPending;
  const isError = isErrorProfile || isErrorProfiles || ticketIsError;

  if (isError) {
    throw new Error('Error getting projects and profiles');
  }
  if (isLoading) {
    return (
      <Stack gap={4}>
        {array.map((_, i) => {
          const isLast = i === array.length - 1;
          return <ReusableSkeleton key={i} height={isLast ? '60px' : '30px'} />;
        })}
      </Stack>
    );
  }
  const { profile } = data;
  const { ticket } = ticketData;
  const memberOptions = profiles?.documents.map((p) => ({
    label: p.name,
    value: p.$id,
  }));
  const isRaisedByMe = profile?.$id === ticket?.raisedId;
  return (
    <EditTicketForm
      profileId={profile?.$id || ''}
      ticketId={ticketId}
      memberOptions={memberOptions}
      initialValues={ticket}
      isRaisedByMe={isRaisedByMe}
    />
  );
};
