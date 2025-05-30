import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { client } from '@/lib/rpc';

type GetDocuments = {
  workspaceId: string;
  more: string;
  searchQuery?: string;
};

export const useGetWorkspaceFolders = ({
  workspaceId,
  more,
  searchQuery,
}: GetDocuments) => {
  return useQuery({
    queryKey: ['workspace-folder', workspaceId, more, searchQuery],
    queryFn: async () => {
      const response = await client.api.documents[':workspaceId'].$get({
        param: { workspaceId },
        query: { more, searchQuery },
      });
      if (!response.ok) {
        const errorResponse = await response.json();
        console.log(errorResponse);

        throw new Error('Failed to get folders');
      }
      const { data } = await response.json();

      return data;
    },
    placeholderData: keepPreviousData,
  });
};
