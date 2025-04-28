import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

import { toaster } from '@/components/ui/toaster';
import { client } from '@/lib/rpc';

type ResponseType = InferResponseType<
  (typeof client.api.tickets)[':ticketId']['$delete'],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.tickets)[':ticketId']['$delete']
>;

export const useDeleteTicket = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const res = await client.api.tickets[':ticketId'].$delete({ param });
      if (!res.ok) {
        throw new Error('Failed to delete ticket');
      }
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tickets'],
      });

      //   router.push(`/workspaces/${workspaceId}/projects/${$id}`);
      toaster.create({
        title: 'Success',
        description: 'Ticket has been deleted',
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
