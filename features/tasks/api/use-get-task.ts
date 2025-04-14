import { useQuery } from '@tanstack/react-query';

import { client } from '@/lib/rpc';

type GetTask = {
  taskId: string;
};

export const useGetTask = ({ taskId }: GetTask) => {
  return useQuery({
    queryKey: ['task', taskId],
    queryFn: async () => {
      const response = await client.api.tasks[':taskId'].$get({
        param: {
          taskId,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to get task');
      }
      ``;
      return await response.json();
    },
  });
};
