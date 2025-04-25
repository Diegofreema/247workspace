import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

import { toaster } from '@/components/ui/toaster';
import { client } from '@/lib/rpc';

type ResponseType = InferResponseType<
  (typeof client.api.feedbacks)[':feedbackId']['$patch'],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.feedbacks)[':feedbackId']['$patch']
>;

export const useEditFeedback = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json, param }) => {
      const res = await client.api.feedbacks[':feedbackId'].$patch({
        json,
        param,
      });
      if (!res.ok) {
        throw new Error('Failed to update feedback');
      }
      return await res.json();
    },
    onSuccess: ({}) => {
      queryClient.invalidateQueries({ queryKey: ['feedbacks'] });

      toaster.create({
        title: 'Success',
        description: 'Feedback has been updated',
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
