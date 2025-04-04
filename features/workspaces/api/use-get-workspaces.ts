import { useQuery } from '@tanstack/react-query';

import { client } from '@/lib/rpc';

export const useGetWorkspaces = () => {
  return useQuery({
    queryKey: ['workspaces'],
    queryFn: async () => {
      const response = await client.api.workspaces.$get();
      if (!response.ok) {
        return null;
      }
      const { data } = await response.json();

      return data;
    },
  });
};
