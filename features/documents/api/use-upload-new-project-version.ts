import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

import { toaster } from '@/components/ui/toaster';
import { client } from '@/lib/rpc';
import { ApiResponse } from '@/types';

type ResponseType = InferResponseType<
  (typeof client.api.documents)['upload-new-version'][':versionId']['$post'],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.documents)['upload-new-version'][':versionId']['$post']
>;

export const useUploadNewProjectVersion = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form, param }) => {
      const res = await client.api.documents['upload-new-project-version'][
        ':versionId'
      ].$post({ form, param });
      if (!res.ok) {
        const errorResponse = (await res.json()) as ApiResponse;
        throw new Error(errorResponse.error || 'Failed to upload new version');
      }

      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project-version-history'] });

      toaster.create({
        title: 'Success',
        description: 'A new version has been updated successfully',
        type: 'success',
      });
    },
    onError: (error) => {
      toaster.create({
        title: 'Something went wrong',
        description: error.message || 'Please try again',
        type: 'error',
        duration: 5000,
      });
    },
  });

  return mutation;
};
