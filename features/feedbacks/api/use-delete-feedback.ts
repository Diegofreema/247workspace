import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

import { toaster } from '@/components/ui/toaster';
import { client } from '@/lib/rpc';

type ResponseType = InferResponseType<
  (typeof client.api.feedbacks)[':feedbackId']['$delete'],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.feedbacks)[':feedbackId']['$delete']
>;

export const useDeleteFeedback = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const res = await client.api.feedbacks[':feedbackId'].$delete({
        param,
      });
      if (!res.ok) {
        throw new Error('Failed to delete feedback');
      }
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feedbacks'] });

      toaster.create({
        title: 'Success',
        description: 'Feedback has been deleted',
        type: 'success',
      });
    },
    onError: (error) => {
      toaster.create({
        title: 'Something went wrong',
        description: error.message || 'Failed to delete feedback',
        type: 'error',
      });
    },
  });

  return mutation;
};
