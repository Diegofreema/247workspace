import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

import { toaster } from '@/components/ui/toaster';
import { client } from '@/lib/rpc';
import { ApiResponse } from '@/types';

type ResponseType = InferResponseType<
  (typeof client.api.tasks)['bulk-update']['$post'],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.tasks)['bulk-update']['$post']
>;

export const useUpdateBulkTask = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const res = await client.api.tasks['bulk-update'].$post({ json });
      if (!res.ok) {
        const errorResponse = (await res.json()) as ApiResponse;
        throw new Error(errorResponse.error || 'Failed to update tasks');
      }
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({
        queryKey: ['project-with-tasks'],
      });

      //   router.push(`/workspaces/${workspaceId}/projects/${$id}`);
      toaster.create({
        title: 'Success',
        description: 'Tasks has been updated',
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
