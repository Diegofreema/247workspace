import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

import { toaster } from '@/components/ui/toaster';
import { client } from '@/lib/rpc';
import { ApiResponse } from '@/types';

type ResponseType = InferResponseType<
  (typeof client.api.comments)[':commentId']['$patch'],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.comments)[':commentId']['$patch']
>;

export const useUpdateComment = () => {
  const queryClient = useQueryClient();

  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json, param }) => {
      const res = await client.api.comments[':commentId'].$patch({
        json,
        param,
      });
      if (!res.ok) {
        const errorResponse = (await res.json()) as ApiResponse;

        throw new Error(errorResponse.error || 'Failed to update feedback');
      }
      return await res.json();
    },
    onSuccess: ({ data: { $id } }) => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      queryClient.invalidateQueries({ queryKey: ['comment', $id] });

      toaster.create({
        title: 'Success',
        description: 'Comment has been updated',
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
};
