import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { client } from '@/lib/rpc';

type GetDocuments = {
  versionId: string;
  page: string;
};

export const useGetProjectVersionHistoryDocuments = ({
  versionId,
  page,
}: GetDocuments) => {
  return useQuery({
    queryKey: ['project-version-history', versionId, page],
    queryFn: async () => {
      const response = await client.api.documents['project-version-history'][
        ':versionId'
      ].$get({
        param: { versionId },
        query: { page },
      });
      if (!response.ok) {
        const errorResponse = await response.json();
        console.log(errorResponse);

        throw new Error('Failed to get documents');
      }
      const { data } = await response.json();

      return data;
    },
    placeholderData: keepPreviousData,
  });
};
