import { useQuery } from '@tanstack/react-query';
import { getLoggedInUser, protect } from '../queries';

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['current-user'],
    queryFn: async () => {
      // TODO: check if user is logged in
      const { user, profile } = await getLoggedInUser();
      return { user, profile };
    },
  });
};
export const useProtect = () => {
  return useQuery({
    queryKey: ['protect-user'],
    queryFn: async () => {
      // TODO: check if user is logged in
      const user = await protect();
      return user;
    },
  });
};
