import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

import { toaster } from '@/components/ui/toaster';
import { client } from '@/lib/rpc';
import { useRouter } from 'next/navigation';

type ResponseType = InferResponseType<(typeof client.api.workspaces)['$post']>;
type RequestType = InferRequestType<(typeof client.api.workspaces)['$post']>;

export const useCreateWorkspace = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form }) => {
      const res = await client.api.workspaces.$post({ form });
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
        // @ts-ignore
        router.replace(`/workspaces/${data?.$id}/home`);
        toaster.create({
          title: 'Success',
          description: 'Your workspace has been created',
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
