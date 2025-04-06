import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

import { toaster } from '@/components/ui/toaster';
import { client } from '@/lib/rpc';
import { useRouter } from 'next/navigation';

type ResponseType = InferResponseType<
  (typeof client.api.workspaces)[':workspaceId']['reset-invite-code']['$post'],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.workspaces)[':workspaceId']['reset-invite-code']['$post']
>;

export const useUpdateWorkspaceInviteCode = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const res = await client.api.workspaces[':workspaceId'][
        'reset-invite-code'
      ].$post({
        param,
      });
      if (!res.ok) {
        throw new Error('Failed to update invite code');
      }
      return await res.json();
    },
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
      queryClient.invalidateQueries({
        queryKey: ['workspace', data?.$id],
      });
      router.refresh();
      toaster.create({
        title: 'Success',
        description: 'Your invite link has been updated',
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
