import { SinglePageClient } from '@/app/(dashboard)/workspaces/[workspaceId]/tickets/[ticketId]/client';
import { WrapperWithPadding } from '@/components/ui/wrapper-padding';
import { protect } from '@/features/auth/queries';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

const SingleTicketPage = async () => {
  const user = await protect();
  if (!user) {
    redirect('/signup');
  }
  return (
    <WrapperWithPadding className="bg-lightGrey">
      <Suspense fallback={null}>
        <SinglePageClient />
      </Suspense>
    </WrapperWithPadding>
  );
};
export default SingleTicketPage;
