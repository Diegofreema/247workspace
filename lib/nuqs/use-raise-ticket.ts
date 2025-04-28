import { parseAsBoolean, useQueryState } from 'nuqs';

export const useRaiseTicketModalController = () => {
  const [isOpen, setIsOpen] = useQueryState(
    'raise-ticket',
    parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true })
  );

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  return { isOpen, open, close, setIsOpen };
};
