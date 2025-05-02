import { parseAsInteger, useQueryState } from 'nuqs';

export const usePaginate = () => {
  return useQueryState('page', parseAsInteger.withDefault(1));
};
export const useProjectPaginate = () => {
  return useQueryState('page', parseAsInteger.withDefault(1));
};
