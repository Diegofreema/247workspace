import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { client } from '@/lib/rpc';

type GetDocuments = {
  workspaceId: string;
  more: string;
};

export const useGetWorkspaceFolders = ({ workspaceId, more }: GetDocuments) => {
  return useQuery({
    queryKey: ['workspace-folder', workspaceId, more],
    queryFn: async () => {
      const response = await client.api.documents[':workspaceId'].$get({
        param: { workspaceId },
        query: { more },
      });
      if (!response.ok) {
        throw new Error('Failed to get folders');
      }
      const { data } = await response.json();

      return data;
    },
    placeholderData: keepPreviousData,
  });
};
