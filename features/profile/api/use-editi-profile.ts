import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

import { toaster } from '@/components/ui/toaster';
import { client } from '@/lib/rpc';
import { useRouter } from 'next/navigation';

type ResponseType = InferResponseType<
  (typeof client.api.profile)[':profileId']['$patch'],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.profile)[':profileId']['$patch']
>;

export const useEditProfile = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json, param }) => {
      console.log({ json, param });

      const res = await client.api.profile[':profileId'].$patch({
        json,
        param,
      });
      if (!res.ok) {
        console.log(res);

        throw new Error('Failed to update profile');
      }
      return await res.json();
    },
    onSuccess: (res) => {
      const {
        data: { $id },
      } = res;
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ['user-profile', $id] });

      //   router.push(`/workspaces/${workspaceId}/projects/${$id}`);
      toaster.create({
        title: 'Success',
        description: 'Profile has been updated',
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
