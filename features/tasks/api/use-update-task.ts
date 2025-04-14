import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

import { toaster } from '@/components/ui/toaster';
import { client } from '@/lib/rpc';
import { useRouter } from 'next/navigation';

type ResponseType = InferResponseType<
  (typeof client.api.tasks)[':taskId']['$patch'],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.tasks)[':taskId']['$patch']
>;

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json, param }) => {
      const res = await client.api.tasks[':taskId'].$patch({ json, param });
      if (!res.ok) {
        throw new Error('Failed to update task');
      }
      return await res.json();
    },
    onSuccess: (res) => {
      const {
        data: { $id, workspaceId },
      } = res;
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['task', $id] });
      //   router.push(`/workspaces/${workspaceId}/projects/${$id}`);
      toaster.create({
        title: 'Success',
        description: 'Task has been updated',
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
