import { useQuery } from '@tanstack/react-query';

import { client } from '@/lib/rpc';

type GetDocuments = {
  projectId: string;
};

export const useGetDocuments = ({ projectId }: GetDocuments) => {
  return useQuery({
    queryKey: ['documents', projectId],
    queryFn: async () => {
      const response = await client.api.documents.$get({
        query: { projectId },
      });
      if (!response.ok) {
        throw new Error('Failed to get documents');
      }
      const { data } = await response.json();

      return data;
    },
  });
};
