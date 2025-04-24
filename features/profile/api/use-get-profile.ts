import { useQuery } from '@tanstack/react-query';

import { client } from '@/lib/rpc';

type GetProfile = {
  profileId: string;
};

export const useGetProfile = ({ profileId }: GetProfile) => {
  return useQuery({
    queryKey: ['user-profile', profileId],
    queryFn: async () => {
      const response = await client.api.profile[':profileId'].$get({
        param: { profileId },
      });
      if (!response.ok) {
        throw new Error('Failed to get profile');
      }
      const { data } = await response.json();

      return data;
    },
  });
};
