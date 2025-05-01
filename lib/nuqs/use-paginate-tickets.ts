import { parseAsInteger, useQueryState } from 'nuqs';

export const usePaginate = () => {
  return useQueryState('page', parseAsInteger.withDefault(1));
};
