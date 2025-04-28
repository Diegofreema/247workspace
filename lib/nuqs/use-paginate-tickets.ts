import { parseAsInteger, useQueryState } from 'nuqs';

export const usePaginateTicket = () => {
  return useQueryState('page', parseAsInteger.withDefault(1));
};
