import { useQuery } from '@tanstack/react-query';

import { client } from '@/lib/rpc';

type GetDocuments = {
  workspaceId: string;
};

export const useGetWorkspaceFolders = ({ workspaceId }: GetDocuments) => {
  return useQuery({
    queryKey: ['workspace-folder', workspaceId],
    queryFn: async () => {
      const response = await client.api.documents[':workspaceId'].$get({
        param: { workspaceId },
      });
      if (!response.ok) {
        throw new Error('Failed to get folders');
      }
      const { data } = await response.json();

      return data;
    },
  });
};
