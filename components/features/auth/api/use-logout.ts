import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferResponseType, InferRequestType } from 'hono';

import { client } from '@/lib/rpc';
import { useRouter } from 'next/navigation';
import { toaster } from '@/components/ui/toaster';

type ResponseType = InferResponseType<(typeof client.api.auth.logout)['$post']>;
type RequestType = InferRequestType<(typeof client.api.auth.logout)['$post']>;

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async () => {
      const res = await client.api.auth.logout.$post();
      return await res.json();
    },
    onSuccess: () => {
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ['current'] });
      toaster.create({
        title: 'Success',
        description: 'Logout Successful ',
        type: 'success',
      });
    },
    onError: () => {
      toaster.create({
        title: 'Error',
        description: 'Something went wrong, Please try again later',
        type: 'error',
      });
    },
  });
};
