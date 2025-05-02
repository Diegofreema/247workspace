import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { client } from '@/lib/rpc';

type GetDocuments = {
  projectId: string;
  more: string;
  searchQuery?: string;
};

export const useGetProjectFolders = ({
  projectId,
  more,
  searchQuery,
}: GetDocuments) => {
  return useQuery({
    queryKey: ['project-folder', projectId, searchQuery, more],
    queryFn: async () => {
      const response = await client.api.documents['get-project-folder'][
        ':projectId'
      ].$get({
        query: { searchQuery, more },
        param: { projectId },
      });
      if (!response.ok) {
        const errorResponse = await response.json();
        console.log(errorResponse);

        throw new Error('Failed to get folders');
      }
      const { data } = await response.json();
      console.log(data);

      return data;
    },
    placeholderData: keepPreviousData,
  });
};
