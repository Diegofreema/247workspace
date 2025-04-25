import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

import { toaster } from '@/components/ui/toaster';
import { client } from '@/lib/rpc';
import { AppwriteException } from 'node-appwrite';

type ResponseType = InferResponseType<
  (typeof client.api.feedbacks)['$post'],
  200
>;
type RequestType = InferRequestType<(typeof client.api.feedbacks)['$post']>;

export const useCreateFeedback = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const res = await client.api.feedbacks.$post({ json });
      if (!res.ok) {
        throw new Error('Failed to send feedback');
      }

      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feedbacks'] });

      toaster.create({
        title: 'Success',
        description: 'Your feedback has been sent',
        type: 'success',
      });
    },
    onError: (error) => {
      console.log(error);

      toaster.create({
        title: 'Something went wrong',
        description: 'Please try again',
        type: 'error',
      });
    },
  });

  return mutation;
};
