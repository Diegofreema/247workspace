import { StatusEnum, TicketStatus } from '@/types';
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
export const useTicketFilters = () => {
  return useQueryStates({
    assigneeId: parseAsString,
    status: parseAsStringEnum(Object.values(TicketStatus)),
    search: parseAsString,
  });
};
