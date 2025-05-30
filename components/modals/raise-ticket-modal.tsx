'use client';

import { colors } from '@/constants';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { CreateTicketFormWrapper } from '@/features/tickets/components/create-ticket-wrapper';
import { useRaiseTicketModalController } from '@/lib/nuqs/use-raise-ticket';

export const CreateTicketModal = () => {
  const { isOpen, setIsOpen } = useRaiseTicketModalController();

  return (
    <Dialog open={isOpen} onOpenChange={(e) => setIsOpen(e)}>
      <DialogContent className={'bg-white'}>
        <DialogHeader>
          <DialogTitle
            color={colors.black}
            className={'text-black text-[25px]'}
          >
            Raise a new ticket
          </DialogTitle>
          <DialogDescription>
            Assign a ticket to a team member and track accountability
          </DialogDescription>
          <CreateTicketFormWrapper />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
