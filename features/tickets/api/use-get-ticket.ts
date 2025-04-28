import { useQuery } from '@tanstack/react-query';

import { client } from '@/lib/rpc';

type GetTask = {
  ticketId: string;
};

export const useGetTicket = ({ ticketId }: GetTask) => {
  return useQuery({
    queryKey: ['task', ticketId],
    queryFn: async () => {
      const response = await client.api.tickets[':ticketId'].$get({
        param: {
          ticketId,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to get task');
      }
      const { data } = await response.json();
      return data;
    },
  });
};
