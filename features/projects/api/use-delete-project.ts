import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

import { toaster } from '@/components/ui/toaster';
import { client } from '@/lib/rpc';
import { useRouter } from 'next/navigation';

type ResponseType = InferResponseType<
  (typeof client.api.projects)[':projectId']['$delete'],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.projects)[':projectId']['$delete']
>;

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const res = await client.api.projects[':projectId'].$delete({
        param,
      });
      if (!res.ok) {
        throw new Error('Failed to delete project');
      }
      return await res.json();
    },
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['project', data.$id] });

      toaster.create({
        title: 'Success',
        description: 'Project has been deleted',
        type: 'success',
      });
    },
    onError: () => {
      toaster.create({
        title: 'Something went wrong',
        description: 'Failed to delete project',
        type: 'error',
      });
    },
  });

  return mutation;
};
