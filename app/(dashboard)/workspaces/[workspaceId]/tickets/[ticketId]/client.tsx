'use client';

import { ErrorComponent } from '@/components/ui/error-component';
import { Loading } from '@/components/ui/loading';
import { PageWrapper } from '@/components/ui/page-wrapper';
import { useCurrentUser } from '@/features/auth/api/use-current-user';
import { useGetTicket } from '@/features/tickets/api/use-get-ticket';
import { DisplaySingleTicket } from '@/features/tickets/components/display-single-ticket';
import { useTicketId } from '@/features/tickets/hooks/use-ticket-id';

export const SinglePageClient = () => {
  const ticketId = useTicketId();
  const { data, isPending, isError, refetch } = useGetTicket({ ticketId });
  const {
    data: profileData,
    isPending: isPendingProfile,
    isError: isErrorProfile,
  } = useCurrentUser();
  if (isError || isErrorProfile) {
    return (
      <ErrorComponent
        message={'Failed to get ticket details'}
        reset={refetch}
      />
    );
  }

  if (isPending || isPendingProfile) {
    return <Loading />;
  }
  const { profile } = profileData;
  const { ticket } = data;

  return (
    <PageWrapper className={'bg-transparent'}>
      <DisplaySingleTicket data={data} profileId={profile?.$id || ''} />
    </PageWrapper>
  );
};
