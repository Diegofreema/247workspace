import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

import { toaster } from '@/components/ui/toaster';
import { client } from '@/lib/rpc';
import { ApiResponse } from '@/types';

type ResponseType = InferResponseType<
  (typeof client.api.profile)[':profileId']['$patch'],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.profile)[':profileId']['$patch']
>;

export const useEditProfile = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form, param }) => {
      const res = await client.api.profile[':profileId'].$patch({
        form,
        param,
      });
      if (!res.ok) {
        const errorResponse = (await res.json()) as ApiResponse;
        console.error(errorResponse);

        throw new Error(errorResponse.error || 'Failed to update profile');
      }
      return await res.json();
    },
    onSuccess: (res) => {
      const {
        data: { $id },
      } = res;

      queryClient.invalidateQueries({ queryKey: ['user-profile', $id] });

      //   router.push(`/workspaces/${workspaceId}/projects/${$id}`);
      toaster.create({
        title: 'Success',
        description: 'Profile has been updated',
        type: 'success',
      });
    },
    onError: (error) => {
      console.log(error);
      toaster.create({
        title: 'Something went wrong',
        description: error.message || 'Please try again',
        type: 'error',
      });
    },
  });

  return mutation;
};
