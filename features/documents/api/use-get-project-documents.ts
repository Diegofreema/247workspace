import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { client } from '@/lib/rpc';

type GetDocuments = {
  folderId: string;
  page: string;
};

export const useGetProjectDocuments = ({ folderId, page }: GetDocuments) => {
  return useQuery({
    queryKey: ['project-documents', folderId, page],
    queryFn: async () => {
      const response = await client.api.documents['project-documents'][
        ':folderId'
      ].$get({
        param: { folderId },
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
