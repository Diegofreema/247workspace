import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

import { toaster } from '@/components/ui/toaster';
import { client } from '@/lib/rpc';
import { useTransitionRouter } from 'next-view-transitions';

type ResponseType = InferResponseType<
  (typeof client.api.projects)[':projectId']['$patch'],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.projects)[':projectId']['$patch']
>;

export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  const router = useTransitionRouter();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form, param }) => {
      const res = await client.api.projects[':projectId'].$patch({
        form,
        param,
      });
      if (!res.ok) {
        throw new Error('Failed to update project');
      }
      return await res.json();
    },
    onSuccess: ({}) => {
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ['projects'] });

      toaster.create({
        title: 'Success',
        description: 'Your project has been updated',
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
