import { useQuery } from '@tanstack/react-query';

import { client } from '@/lib/rpc';

type GetMemberProps = {
  memberId: string;
};

export const useGetMember = ({ memberId }: GetMemberProps) => {
  return useQuery({
    queryKey: ['member', memberId],
    queryFn: async () => {
      const response = await client.api.members.member.$get({
        query: { memberId },
      });
      if (!response.ok) {
        throw new Error('Failed to get member');
      }
      const members = await response.json();

      return members;
    },
  });
};
