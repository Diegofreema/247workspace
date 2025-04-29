"use client";

import { useTicketId } from "@/features/tickets/hooks/use-ticket-id";
import { PageWrapper } from "@/components/ui/page-wrapper";
import { DisplaySingleTicket } from "@/features/tickets/components/display-single-ticket";
import { useGetTicket } from "@/features/tickets/api/use-get-ticket";
import { ErrorComponent } from "@/components/ui/error-component";
import { Loading } from "@/components/ui/loading";

export const SinglePageClient = () => {
  const ticketId = useTicketId();
  const { data, isPending, isError, refetch } = useGetTicket({ ticketId });
  if (isError) {
    return (
      <ErrorComponent
        message={"Failed to get ticket details"}
        reset={refetch}
      />
    );
  }

  if (isPending) {
    return <Loading />;
  }

  return (
    <PageWrapper className={"bg-transparent"}>
      <DisplaySingleTicket data={data} />
    </PageWrapper>
  );
};
