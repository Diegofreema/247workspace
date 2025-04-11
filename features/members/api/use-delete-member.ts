import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

import { toaster } from '@/components/ui/toaster';
import { client } from '@/lib/rpc';
import { useRouter } from 'next/navigation';

type ResponseType = InferResponseType<
  (typeof client.api.members)[':memberId']['$delete'],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.members)[':memberId']['$delete']
>;

export const useDeleteMember = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const res = await client.api.members[':memberId'].$delete({
        param,
      });
      if (!res.ok) {
        throw new Error('Failed to remove member');
      }
      return await res.json();
    },
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
      queryClient.invalidateQueries({ queryKey: ['member', data.$id] });
      router.refresh();
      toaster.create({
        title: 'Success',

        type: 'success',
      });
    },
    onError: () => {
      toaster.create({
        title: 'Something went wrong',
        description:
          'Please try again later or contact support if the issue persists',
        type: 'error',
      });
    },
  });

  return mutation;
};
