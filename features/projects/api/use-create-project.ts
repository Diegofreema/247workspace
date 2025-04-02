import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

import { toaster } from '@/components/ui/toaster';
import { client } from '@/lib/rpc';

type ResponseType = InferResponseType<(typeof client.api.projects)['$post']>;
type RequestType = InferRequestType<(typeof client.api.projects)['$post']>;

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form }) => {
      const res = await client.api.projects.$post({ form });
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
        queryClient.invalidateQueries({ queryKey: ['projects'] });
        toaster.create({
          title: 'Success',
          description: 'Your project has been created',
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
