import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

import { toaster } from '@/components/ui/toaster';
import { client } from '@/lib/rpc';
import { useTransitionRouter } from 'next-view-transitions';
import { AppwriteException } from 'node-appwrite';

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
    onSuccess: ({ data: { $id } }) => {
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['project', $id] });
      queryClient.invalidateQueries({
        queryKey: ['project-with-tasks'],
      });

      toaster.create({
        title: 'Success',
        description: 'Project has been updated',
        type: 'success',
      });
    },
    onError: (error) => {
      let errorMessage = error.message;

      if (error instanceof AppwriteException) {
        if (error.type === 'document_invalid_structure') {
          errorMessage = 'Missing a required field';
        }
        if (error.type === 'storage_invalid_file_size') {
          errorMessage = 'File size is too large, max 1mb';
        }
      }

      toaster.create({
        title: 'Something went wrong',
        description: errorMessage,
        type: 'error',
      });
    },
  });

  return mutation;
};
