import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

import { toaster } from '@/components/ui/toaster';
import { client } from '@/lib/rpc';
import { useRouter } from 'next/navigation';

type ResponseType = InferResponseType<
  (typeof client.api.members)[':memberId']['$patch'],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.members)[':memberId']['$patch']
>;

export const useUpdateMemberRole = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param, json }) => {
      const res = await client.api.members[':memberId'].$patch({
        param,
        json,
      });
      if (!res.ok) {
        throw new Error('Failed to update member role');
      }
      return await res.json();
    },
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ['member'] });
      queryClient.invalidateQueries({
        queryKey: ['member', data?.$id],
      });
      router.refresh();
      toaster.create({
        title: 'Success',
        description: 'Member role has been updated',
        type: 'success',
      });
    },
    onError: ({ message }) => {
      toaster.create({
        title: 'Something went wrong',
        description: message,
        type: 'error',
      });
    },
  });

  return mutation;
};
