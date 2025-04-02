import { useQueryState } from 'nuqs';

export const useCreateWorkspace = () => {
  return useQueryState('create-workspace', {});
};
