import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

import { toaster } from '@/components/ui/toaster';
import { client } from '@/lib/rpc';
import { useTransitionRouter } from 'next-view-transitions';

type ResponseType = InferResponseType<
  (typeof client.api.projects)['$post'],
  200
>;
type RequestType = InferRequestType<(typeof client.api.projects)['$post']>;

export const useCreateProject = (isProjectPage?: boolean) => {
  const queryClient = useQueryClient();
  const router = useTransitionRouter();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form }) => {
      const res = await client.api.projects.$post({ form });
      if (!res.ok) {
        throw new Error('Failed to create project');
      }
      return await res.json();
    },
    onSuccess: (res) => {
      const {
        data: { $id, workspaceId },
      } = res;
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({
        queryKey: ['project-with-tasks', workspaceId],
      });
      if (!isProjectPage) {
        router.push(`/workspaces/${workspaceId}/projects/${$id}`);
      }
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
