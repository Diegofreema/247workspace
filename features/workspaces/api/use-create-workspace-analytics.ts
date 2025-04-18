import { useQuery } from '@tanstack/react-query';

import { client } from '@/lib/rpc';

type GetProjectAnalytics = {
  workspaceId: string;
};

export const useGetWorkspaceAnalytics = ({
  workspaceId,
}: GetProjectAnalytics) => {
  return useQuery({
    queryKey: ['workspace-analytics', workspaceId],
    queryFn: async () => {
      const response = await client.api.workspaces[':workspaceId'][
        'analytics'
      ].$get({
        param: { workspaceId },
      });
      if (!response.ok) {
        throw new Error('Failed to get workspace analytics');
      }
      const { data } = await response.json();

      return data;
    },
  });
};
