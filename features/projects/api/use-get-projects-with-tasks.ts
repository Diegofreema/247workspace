import { useQuery } from '@tanstack/react-query';

import { client } from '@/lib/rpc';

type Props = {
  workspaceId: string;
};

export const useGetProjectsWithTasks = ({ workspaceId }: Props) => {
  return useQuery({
    queryKey: ['project-with-tasks', workspaceId],
    queryFn: async () => {
      const response = await client.api.projects['project-with-tasks'].$get({
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
