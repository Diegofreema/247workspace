import { useQuery } from '@tanstack/react-query';

import { client } from '@/lib/rpc';

type GetTasks = {
  workspaceId: string;
};

export const useGetTasks = ({ workspaceId }: GetTasks) => {
  return useQuery({
    queryKey: ['tasks', workspaceId],
    queryFn: async () => {
      const response = await client.api.tasks.$get({
        query: { workspaceId },
      });
      if (!response.ok) {
        throw new Error('Failed to get tasks');
      }
      const projects = await response.json();

      return projects;
    },
  });
};
