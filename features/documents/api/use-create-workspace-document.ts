import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

import { toaster } from '@/components/ui/toaster';
import { client } from '@/lib/rpc';
import { ApiResponse } from '@/types';

type ResponseType = InferResponseType<
  (typeof client.api.documents)['create-workspace-document']['$post'],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.documents)['create-workspace-document']['$post']
>;

export const useUploadWorkspaceDocument = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form }) => {
      const res = await client.api.documents['create-workspace-document'].$post(
        { form }
      );
      if (!res.ok) {
        const errorResponse = (await res.json()) as ApiResponse;
        throw new Error(errorResponse.error || 'Failed to upload document');
      }

      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspace-documents'] });

      toaster.create({
        title: 'Success',
        description: 'Your document has been uploaded successfully',
        type: 'success',
      });
    },
    onError: (error) => {
      toaster.create({
        title: 'Something went wrong',
        description: error.message || 'Please try again',
        type: 'error',
      });
    },
  });

  return mutation;
};
