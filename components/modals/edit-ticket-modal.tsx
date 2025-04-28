'use client';

import { colors } from '@/constants';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { EditTicketWrapper } from '@/features/tickets/components/edit-ticket-wrapper';
import { useEditTicketModalController } from '@/lib/nuqs/use-edit-ticket-modal-controller';

export const EditTicketModal = () => {
  const { ticketId, close } = useEditTicketModalController();

  return (
    <Dialog open={!!ticketId} onOpenChange={close}>
      <DialogContent className={'bg-white'}>
        <DialogHeader>
          <DialogTitle
            color={colors.black}
            className={'text-black text-[25px]'}
          >
            Edit ticket
          </DialogTitle>

          {ticketId && <EditTicketWrapper ticketId={ticketId} />}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
