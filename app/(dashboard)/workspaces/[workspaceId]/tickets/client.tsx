'use client';

import { ErrorComponent } from '@/components/ui/error-component';
import { Loading } from '@/components/ui/loading';
import { WrapperWithPadding } from '@/components/ui/wrapper-padding';
import { useGetTickets } from '@/features/tickets/api/use-get-tickets';
import { DisplayTicket } from '@/features/tickets/components/display-ticket';
import { useWorkspaceId } from '@/hooks/useWorkspaceId';
import { useTicketFilters } from '@/lib/nuqs/use-data-filter';
import { usePaginateTicket } from '@/lib/nuqs/use-paginate-tickets';

export const TicketClient = () => {
  const workspaceId = useWorkspaceId();
  const [page] = usePaginateTicket();
  const [filters] = useTicketFilters();
  const { assigneeId, search, status } = filters;
  // const [value] = useDebounce(() => setFilters({search}) ,500, [search])
  const { data, isPending, isError, refetch, error } = useGetTickets({
    workspaceId,
    page: page.toString(),
    assigneeId,
    status,
  });

  if (isError) {
    return (
      <ErrorComponent
        className="min-h-screen"
        message="Failed to get tickets"
        reset={refetch}
      />
    );
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
