import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

import { toaster } from '@/components/ui/toaster';
import { client } from '@/lib/rpc';

type ResponseType = InferResponseType<
  (typeof client.api.tickets)['$post'],
  200
>;
type RequestType = InferRequestType<(typeof client.api.tickets)['$post']>;

export const useRaiseTicket = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const res = await client.api.tickets.$post({ json });
      if (!res.ok) {
        throw new Error('Failed to raise ticket');
      }
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });

      toaster.create({
        title: 'Success',
        description: 'Ticket has been raised successfully',
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
