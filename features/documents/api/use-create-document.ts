import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

import { toaster } from '@/components/ui/toaster';
import { client } from '@/lib/rpc';
import { AppwriteException } from 'node-appwrite';

type ResponseType = InferResponseType<
  (typeof client.api.documents)['$post'],
  200
>;
type RequestType = InferRequestType<(typeof client.api.documents)['$post']>;

export const useUploadDocument = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form }) => {
      const res = await client.api.documents.$post({ form });
      if (!res.ok) {
        throw new Error('Failed to upload document');
      }

      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });

      toaster.create({
        title: 'Success',
        description: 'Your document has been uploaded successfully',
        type: 'success',
      });
    },
    onError: (error) => {
      console.log(error);
      if (error instanceof AppwriteException) {
        let errorMessage = error.message;
        if (error.type === 'document_invalid_structure') {
          errorMessage = 'Missing a required field';
        }
        if (error.type === 'storage_invalid_file_size') {
          errorMessage = 'File size is too large, max 1mb';
        }
        toaster.create({
          title: 'Error',
          description: errorMessage,
          type: 'error',
        });
        return;
      }
      toaster.create({
        title: 'Something went wrong',
        description: 'Please try again',
        type: 'error',
      });
    },
  });

  return mutation;
};
