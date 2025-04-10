import { useQuery } from '@tanstack/react-query';
import { getLoggedInUser } from '../queries';

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['current-user'],
    queryFn: async () => {
      return await getLoggedInUser();
    },
  });
};
