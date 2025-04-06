import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

import { toaster } from '@/components/ui/toaster';
import { client } from '@/lib/rpc';
import { useRouter } from 'next/navigation';

type ResponseType = InferResponseType<
  (typeof client.api.workspaces)[':workspaceId']['$patch']
>;
type RequestType = InferRequestType<
  (typeof client.api.workspaces)[':workspaceId']['$patch']
>;

export const useUpdateWorkspace = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form, param }) => {
      const res = await client.api.workspaces[':workspaceId'].$patch({
        form,
        param,
      });
      if (!res.ok) {
        throw new Error('Failed to update workspace');
      }
      return await res.json();
    },
    onSuccess: (data) => {
      if (!data.success) {
        toaster.create({
          title: 'Something went wrong',
          description: data.errorMessage,
          type: 'error',
        });
      } else {
        queryClient.invalidateQueries({ queryKey: ['workspaces'] });
        queryClient.invalidateQueries({
          queryKey: ['workspace', data?.workspace?.$id],
        });
        router.refresh();
        toaster.create({
          title: 'Success',
          description: 'Your workspace has been updated',
          type: 'success',
        });
      }
    },
    onError: () => {
      toaster.create({
        title: 'Something went wrong',
        description: 'Please try again',
        type: 'error',
      });
    },
  });

  return mutation;
};
