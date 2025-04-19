import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { client } from '@/lib/rpc';

type Props = {
  workspaceId: string;
  offset: string;
};

export const useGetProjectsWithTasks = ({ workspaceId, offset }: Props) => {
  return useQuery({
    queryKey: ['project-with-tasks', workspaceId, offset],
    queryFn: async () => {
      const response = await client.api.projects['project-with-tasks'].$get({
        query: { workspaceId, offset },
      });
      if (!response.ok) {
        throw new Error('Failed to get projects');
      }
      const { data } = await response.json();
      return data;
    },
    placeholderData: keepPreviousData,
  });
};
