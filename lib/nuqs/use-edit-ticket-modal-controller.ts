import { parseAsString, useQueryState } from 'nuqs';

export const useEditTicketModalController = () => {
  const [ticketId, setTicketId] = useQueryState('edit-ticket', parseAsString);

  const open = (id: string) => setTicketId(id);
  const close = () => setTicketId(null);
  return { ticketId, open, close, setTicketId };
};
