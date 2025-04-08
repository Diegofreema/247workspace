import { useQuery } from '@tanstack/react-query';

import { client } from '@/lib/rpc';

type GetMemberProps = {
  workspaceId: string;
};

export const useGetMembers = ({ workspaceId }: GetMemberProps) => {
  return useQuery({
    queryKey: ['members', workspaceId],
    queryFn: async () => {
      const response = await client.api.members.$get({
        query: { workspaceId },
      });
      if (!response.ok) {
        throw new Error('Failed to get members');
      }
      const members = await response.json();

      return members;
    },
  });
};
