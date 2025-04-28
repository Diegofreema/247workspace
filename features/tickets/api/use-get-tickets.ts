import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { client } from '@/lib/rpc';
import { StatusEnum } from '@/types';

type GetTickets = {
  workspaceId: string;
  status?: StatusEnum | null;
  assigneeId?: string | null;
  page?: string | null;
  search?: string | null;
};

export const useGetTickets = ({
  workspaceId,

  assigneeId,
  status,
  page,
  search,
}: GetTickets) => {
  return useQuery({
    queryKey: ['tasks', workspaceId, page, assigneeId, status, search],
    queryFn: async () => {
      const response = await client.api.tickets.$get({
        query: {
          workspaceId,

          assigneeId: assigneeId ?? undefined,
          status: status ?? undefined,
          page: page ?? undefined,
          search: search ?? undefined,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to get tickets');
      }
      const { data } = await response.json();
      return data;
    },
    placeholderData: keepPreviousData,
  });
};
