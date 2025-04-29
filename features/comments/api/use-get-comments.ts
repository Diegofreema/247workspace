import { useQuery } from '@tanstack/react-query';

import { client } from '@/lib/rpc';

type GetComments = {
  ticketId: string;
};

export const useGetComments = ({ ticketId }: GetComments) => {
  return useQuery({
    queryKey: ['comments', ticketId],
    queryFn: async () => {
      const response = await client.api.comments[':ticketId'].$get({
        param: { ticketId },
      });
      if (!response.ok) {
        throw new Error('Failed to get comments');
      }
      const { data } = await response.json();

      return data;
    },
  });
};
