import { StatusEnum } from '@/types';
import { parseAsString, parseAsStringEnum, useQueryStates } from 'nuqs';

export const useDataFilters = () => {
  return useQueryStates({
    projectId: parseAsString,
    assigneeId: parseAsString,
    status: parseAsStringEnum(Object.values(StatusEnum)),
    dueDate: parseAsString,
    search: parseAsString,
  });
};
