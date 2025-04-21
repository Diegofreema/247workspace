import { useQuery } from '@tanstack/react-query';

import { client } from '@/lib/rpc';
import { InferRequestType, InferResponseType } from 'hono';

type GetDocument = {
  documentId: string;
};

export const useGetDocument = ({ documentId }: GetDocument) => {
  return useQuery({
    queryKey: ['document', documentId],
    queryFn: async () => {
      const response = await client.api.documents[':documentId'].$get({
        param: { documentId },
      });

      if (!response.ok) {
        throw new Error('Failed to get document');
      }
      const { data } = await response.json();

      return data;
    },
  });
};
