import { useQuery } from '@tanstack/react-query';

import { client } from '@/lib/rpc';

type GetProjects = {
  workspaceId: string;
};

export const useGetProjects = ({ workspaceId }: GetProjects) => {
  return useQuery({
    queryKey: ['projects', workspaceId],
    queryFn: async () => {
      const response = await client.api.projects.$get({
        query: { workspaceId },
      });
      if (!response.ok) {
        throw new Error('Failed to get projects');
      }
      const { data } = await response.json();

      return data;
    },
  });
};
