import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

import { toaster } from '@/components/ui/toaster';
import { client } from '@/lib/rpc';

type ResponseType = InferResponseType<
  (typeof client.api.tickets)[':ticketId']['$patch'],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.tickets)[':ticketId']['$patch']
>;

export const useUpdateTicket = () => {
  const queryClient = useQueryClient();

  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json, param }) => {
      const res = await client.api.tickets[':ticketId'].$patch({ json, param });
      if (!res.ok) {
        const errorResponse = (await res.json()) as {
          error?: string;
          data?: Record<string, any>;
        };

        throw new Error(errorResponse.error || 'Failed to update task');
      }
      return await res.json();
    },
    onSuccess: (res) => {
      const {
        data: { $id },
      } = res;

      queryClient.invalidateQueries({ queryKey: ['tickets'] });
      queryClient.invalidateQueries({ queryKey: ['ticket', $id] });

      toaster.create({
        title: 'Success',
        description: 'Ticket has been updated',
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
