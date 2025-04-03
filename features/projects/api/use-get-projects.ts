import { useQuery } from '@tanstack/react-query';

import { client } from '@/lib/rpc';

export const useGetProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const response = await client.api.projects.$get();
      if (!response.ok) {
        return null;
      }
      const { data } = await response.json();

      return data;
    },
  });
};
