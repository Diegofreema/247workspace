import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

import { toaster } from '@/components/ui/toaster';
import { client } from '@/lib/rpc';
import { useRouter } from 'next/navigation';

type ResponseType = InferResponseType<
  (typeof client.api.projects)['$post'],
  200
>;
type RequestType = InferRequestType<(typeof client.api.projects)['$post']>;

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form }) => {
      const res = await client.api.projects.$post({ form });
      if (!res.ok) {
        throw new Error('Failed to create project');
      }
      return await res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      // router.replace(`/workspaces/${data?.$id}/home`);
      toaster.create({
        title: 'Success',
        description: 'Your project has been created',
        type: 'success',
      });
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
