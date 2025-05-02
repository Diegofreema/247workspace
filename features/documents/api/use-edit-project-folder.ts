import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

import { toaster } from '@/components/ui/toaster';
import { client } from '@/lib/rpc';
import { ApiResponse } from '@/types';

type ResponseType = InferResponseType<
  (typeof client.api.documents)['project-folder'][':folderId']['$patch'],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.documents)['project-folder'][':folderId']['$patch']
>;

export const useEditProjectFolder = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json, param }) => {
      const res = await client.api.documents['project-folder'][
        ':folderId'
      ].$patch({
        json,
        param,
      });
      if (!res.ok) {
        const errorResponse = (await res.json()) as ApiResponse;
        throw new Error(errorResponse.error || 'Failed to update folder');
      }

      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project-folder'] });

      toaster.create({
        title: 'Success',
        description: 'Your folder has been updated successfully',
        type: 'success',
      });
    },
    onError: (error) => {
      toaster.create({
        title: 'Something went wrong',
        description: error.message || 'Please try again',
        type: 'error',
        duration: 5000,
      });
    },
  });

  return mutation;
};
