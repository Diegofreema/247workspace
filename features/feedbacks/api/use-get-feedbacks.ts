import { useQuery } from '@tanstack/react-query';

import { client } from '@/lib/rpc';

type GetFeedbacks = {
  taskId: string;
};

export const useGetFeedbacks = ({ taskId }: GetFeedbacks) => {
  return useQuery({
    queryKey: ['feedbacks', taskId],
    queryFn: async () => {
      const response = await client.api.feedbacks[':taskId'].$get({
        param: { taskId },
      });
      if (!response.ok) {
        throw new Error('Failed to get feedbacks');
      }
      const { data } = await response.json();

      return data;
    },
  });
};
