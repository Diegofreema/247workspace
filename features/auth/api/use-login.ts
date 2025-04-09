import { useMutation } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

import { client } from '@/lib/rpc';

type ResponseType = InferResponseType<
  (typeof client.api.auth.onBoard)['$post'],
  200
>;
type RequestType = InferRequestType<(typeof client.api.auth.onBoard)['$post']>;

export const useOnboard = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const res = await client.api.auth.onBoard.$post({ json });
      if (!res.ok) {
        throw new Error(
          'Failed to complete onboarding, please try again later or contact support if the issue persists.'
        );
      }
      return await res.json();
    },
  });

  return mutation;
};
