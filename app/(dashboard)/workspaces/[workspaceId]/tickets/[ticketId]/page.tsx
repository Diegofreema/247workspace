import { SinglePageClient } from "@/app/(dashboard)/workspaces/[workspaceId]/tickets/[ticketId]/client";
import { WrapperWithPadding } from "@/components/ui/wrapper-padding";
import { Suspense } from "react";

const SingleTicketPage = () => {
  return (
    <WrapperWithPadding className="bg-lightGrey">
      <Suspense fallback={null}>
        <SinglePageClient />
      </Suspense>
    </WrapperWithPadding>
  );
};
export default SingleTicketPage;
