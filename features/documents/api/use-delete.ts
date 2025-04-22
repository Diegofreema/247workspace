import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

import { toaster } from '@/components/ui/toaster';
import { client } from '@/lib/rpc';

type ResponseType = InferResponseType<
  (typeof client.api.documents)[':documentId']['$delete'],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.documents)[':documentId']['$delete']
>;

export const useDeleteDocument = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const res = await client.api.documents[':documentId'].$delete({
        param,
      });
      if (!res.ok) {
        throw new Error('Failed to delete project');
      }
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });

      toaster.create({
        title: 'Success',
        description: 'Document has been deleted',
        type: 'success',
      });
    },
    onError: (error) => {
      toaster.create({
        title: 'Something went wrong',
        description: error.message || 'Failed to delete document',
        type: 'error',
      });
    },
  });

  return mutation;
};
