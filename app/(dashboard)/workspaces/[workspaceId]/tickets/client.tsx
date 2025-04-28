'use client';

import { ErrorComponent } from '@/components/ui/error-component';
import { Loading } from '@/components/ui/loading';
import { WrapperWithPadding } from '@/components/ui/wrapper-padding';
import { useGetTickets } from '@/features/tickets/api/use-get-tickets';
import { DisplayTicket } from '@/features/tickets/components/display-ticket';
import { useWorkspaceId } from '@/hooks/useWorkspaceId';
import { usePaginateTicket } from '@/lib/nuqs/use-paginate-tickets';

export const TicketClient = () => {
  const workspaceId = useWorkspaceId();
  const [page] = usePaginateTicket();
  const { data, isPending, isError, refetch } = useGetTickets({
    workspaceId,
    page: page.toString(),
  });
  if (isError) {
    return <ErrorComponent message="Failed to get tickets" reset={refetch} />;
  }
  if (isPending) {
    return <Loading />;
  }

  return (
    <WrapperWithPadding className="bg-lightGrey">
      <DisplayTicket tickets={data.documents} total={data.total} />
    </WrapperWithPadding>
  );
};
