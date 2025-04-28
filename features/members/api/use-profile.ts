import { client } from '@/lib/rpc';
import { useQuery } from '@tanstack/react-query';
type GetProfiles = {
  workspaceId: string;
};
export const useGetProfiles = ({ workspaceId }: GetProfiles) => {
  return useQuery({
    queryKey: ['members-profiles', workspaceId],
    queryFn: async () => {
      const response = await client.api.members.profiles.$get({
        query: { workspaceId },
      });
      if (!response.ok) {
        throw new Error('Failed to get profile');
      }
      const { data } = await response.json();

      return data;
    },
  });
};
