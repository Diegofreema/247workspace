import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

import { toaster } from '@/components/ui/toaster';
import { client } from '@/lib/rpc';
import { useRouter } from 'next/navigation';

type ResponseType = InferResponseType<
  (typeof client.api.workspaces)[':workspaceId']['join']['$post'],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.workspaces)[':workspaceId']['join']['$post']
>;

export const useJoinWorkspace = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param, json }) => {
      const res = await client.api.workspaces[':workspaceId']['join'].$post({
        param,
        json,
      });
      if (!res.ok) {
        throw new Error('Failed to join workspace');
      }
      return await res.json();
    },
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
      queryClient.invalidateQueries({
        queryKey: ['workspace', data?.$id],
      });
      router.refresh();
      router.replace(`/workspaces/${data?.$id}/home`);
      toaster.create({
        title: 'Success',
        description: `You have joined ${data?.name} workspace`,
        type: 'success',
      });
    },
    onError: ({ message, cause }) => {
      console.log(cause);

      toaster.create({
        title: 'Something went wrong',
        description: message,
        type: 'error',
      });
    },
  });

  return mutation;
};
